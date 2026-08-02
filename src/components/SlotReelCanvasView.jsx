import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { getPaylineSymbolFromScrollStrip, getStripSymbolAtRowIndex } from "../lib/slotSkillStopResolve";

// --- slot_only/src/App.tsx 由来（リール物理・描画） ---
/** slot_only: MAX_DELTA_SECONDS — タブ復帰時の delta スパイク上限 */
const MAX_DELTA_SECONDS = 0.05;
/** slot_only: BASE_SPIN_SPEED 相当（行/秒） */
const SPIN_SPEED_ROWS = 8.2;
/** slot_only: MAX_SNAP_SLIDE_SYMBOLS — 最終スライドに入る距離（行） */
const MAX_SNAP_SLIDE_ROWS = 1;
/** slot_only: SNAP_SLIDE_SPEED */
const SNAP_SLIDE_SPEED = 30;
/** slot_only: LOCK_BOUNCE_DURATION */
const LOCK_BOUNCE_DURATION = 0.22;
/** slot_only: STRIP_ROW_RENDER_MIN / MAX */
const STRIP_ROW_RENDER_MIN = -4;
const STRIP_ROW_RENDER_MAX = 5;
/** slot_only: 円筒ワープ */
const DRUM_MIN_SCALE_Y = 0.68;
const DRUM_EDGE_SCALE_X = 0.94;
const DRUM_WARP_Y_PULL = 0.22;

const WIN_PULSE_SPEED = 3.6;
const SETTLED_SCROLL_EPS = 0.0015;
const SETTLED_SLIP_EPS = 0.4;
/** 目押し：当たり絵柄の明るさ倍率 / それ以外 */
const SKILL_AIM_MATCH_BRIGHT_MULT = 1.06;
const SKILL_AIM_OTHER_BRIGHT_MULT = 0.55;
const SKILL_AIM_MATCH_GLOW_PAYLINE = 0.38;
const SKILL_AIM_MATCH_GLOW_ROW = 0.2;

/** slot_only: renderScrollMinSlot / renderScrollMaxSlot */
const renderScrollMinRow = (scroll) => scroll - STRIP_ROW_RENDER_MAX;
const renderScrollMaxRow = (scroll) => scroll - STRIP_ROW_RENDER_MIN;

/** slot_only: cellYFromStripScroll — rowH = REEL_STRIP_STEP（絵文字リールは gap なし） */
const cellYFromScroll = (rowIdx, scrollRows, rowH, bounceOffset) =>
  (rowIdx - scrollRows) * rowH + bounceOffset;

/** slot_only: subpixelSnap */
const subpixelSnap = (y) => Math.fround(y);

/** slot_only: glidingStripSlotRange */
const glidingRowRange = (scroll) => {
  const margin = 1;
  return {
    minRow: Math.ceil(renderScrollMinRow(scroll) - margin),
    maxRow: Math.floor(renderScrollMaxRow(scroll) + margin),
  };
};

/** slot_only: computePreciseSnapTarget — 回転方向（scrollRows 減少）へ進む。0 へ巻き戻さない */
function computeSnapTarget(scrollRows) {
  if (Math.abs(scrollRows) < SETTLED_SCROLL_EPS) return 0;
  if (scrollRows > -MAX_SNAP_SLIDE_ROWS && scrollRows < 0) return 0;
  const nearest = Math.round(scrollRows);
  if (nearest <= scrollRows) return nearest;
  return Math.floor(scrollRows);
}

/** STOP 後：回転方向のまま stopTarget へ glide（確定絵柄は drawColumn 側で固定） */
function beginColumnStopGlide(st) {
  const target = computeSnapTarget(st.scrollRows);
  const remaining = target - st.scrollRows;

  if (Math.abs(remaining) <= SETTLED_SCROLL_EPS) {
    st.phase = "stopped";
    st.scrollRows = 0;
    st.stopTarget = null;
    st.bounceTimer = LOCK_BOUNCE_DURATION;
    return;
  }

  /** 残り1行未満は逆回転せず即ロック（バウンスのみ） */
  if (target === 0 && st.scrollRows > -MAX_SNAP_SLIDE_ROWS && st.scrollRows < 0) {
    st.phase = "stopped";
    st.scrollRows = 0;
    st.stopTarget = null;
    st.bounceTimer = LOCK_BOUNCE_DURATION;
    return;
  }

  st.phase = "stopping";
  st.stopTarget = target;
}

/** slot_only: getCylindricalWarp（rowH を半径にスケール） */
function getCylindricalWarp(cellY, rowH, viewH) {
  const drumCenterY = viewH * 0.5;
  const drumRadius = rowH;
  const cellCenterY = cellY + rowH / 2;
  const distPx = cellCenterY - drumCenterY;
  const normalizedDist = Math.max(-1, Math.min(1, distPx / drumRadius));
  const edgeAmount = Math.min(1, Math.abs(normalizedDist));
  const edgeCurve = Math.sin(edgeAmount * Math.PI * 0.5);
  const scaleY = 1 - (1 - DRUM_MIN_SCALE_Y) * edgeCurve;
  const scaleX = 1 - (1 - DRUM_EDGE_SCALE_X) * edgeCurve;
  const offsetY =
    -Math.sign(distPx) * edgeAmount * edgeAmount * DRUM_WARP_Y_PULL * rowH;
  return { scaleX, scaleY, offsetY, normalizedDist };
}

/** slot_only: drawReelWindowLightingGradient — 上下帯のみ（中央は触らない） */
function drawReelWindowLightingGradient(ctx, w, h, rowH) {
  const midTop = (h - rowH) / 2;
  const midBottom = midTop + rowH;

  const topGrad = ctx.createLinearGradient(0, 0, 0, midTop);
  topGrad.addColorStop(0, "rgba(0,0,0,0.85)");
  topGrad.addColorStop(0.55, "rgba(0,0,0,0.35)");
  topGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, w, midTop);

  const botGrad = ctx.createLinearGradient(0, midBottom, 0, h);
  botGrad.addColorStop(0, "rgba(0,0,0,0)");
  botGrad.addColorStop(0.45, "rgba(0,0,0,0.35)");
  botGrad.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, midBottom, w, h - midBottom);
}

function rowBrightness(rowCenterY, viewH) {
  const mid = viewH * 0.5;
  const dist = Math.abs(rowCenterY - mid) / (viewH * 0.5);
  return 0.42 + (1 - Math.min(1, dist)) * 0.58;
}

function makeColumnState() {
  return {
    scrollRows: 0,
    phase: "idle",
    symbols: ["?", "?", "?"],
    slipNudge: 0,
    /** slot_only: stopTargetsRef */
    stopTarget: null,
    /** slot_only: reelBounceTimersRef */
    bounceTimer: 0,
  };
}

function drawSymbol(ctx, sym, cx, cy, fontSize, alpha, glow, scaleX, scaleY, winScale) {
  const sy = scaleY * (winScale ?? 1);
  const sx = scaleX;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(sx, sy);
  ctx.globalAlpha = alpha;
  ctx.font = `700 ${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (glow > 0) {
    ctx.shadowColor = `rgba(251, 191, 36, ${0.35 + glow * 0.55})`;
    ctx.shadowBlur = 8 + glow * 22;
  }
  ctx.fillStyle = "#f1f5f9";
  ctx.fillText(sym, 0, 0);
  ctx.restore();
}

/** 中央ライン＋◀▶マーク（Canvas 内に描画して DOM 重ねのチラつきを防ぐ） */
function drawPaylineOverlay(ctx, w, h) {
  const midY = h * 0.5;
  const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
  lineGrad.addColorStop(0, "rgba(248, 113, 113, 0)");
  lineGrad.addColorStop(0.12, "rgba(248, 113, 113, 0.15)");
  lineGrad.addColorStop(0.5, "rgba(239, 68, 68, 0.95)");
  lineGrad.addColorStop(0.88, "rgba(248, 113, 113, 0.15)");
  lineGrad.addColorStop(1, "rgba(248, 113, 113, 0)");

  ctx.save();
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2;
  ctx.shadowColor = "rgba(239, 68, 68, 0.45)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(0, midY);
  ctx.lineTo(w, midY);
  ctx.stroke();
  ctx.restore();

  const markSize = Math.max(7, Math.min(w * 0.045, 11));
  ctx.save();
  ctx.font = `700 ${markSize}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(248, 113, 113, 0.95)";
  ctx.shadowColor = "rgba(239, 68, 68, 0.75)";
  ctx.shadowBlur = 8;
  ctx.fillText("▶", markSize * 0.9, midY);
  ctx.fillText("◀", w - markSize * 0.9, midY);
  ctx.restore();
}

function drawColumn(
  ctx,
  colX,
  colW,
  h,
  state,
  { paylineWin, bounce, slipActive, machine, winPulse, scrollStrip, skillAimSymbol },
) {
  const rowH = h / 3;
  const fontSize = Math.max(10, Math.min(colW * 0.52, rowH * 0.62));
  const cx = colX + colW / 2;
  const scroll = state.scrollRows;
  const baseSymbols = state.symbols.length === 3 ? state.symbols : ["?", "?", "?"];
  const hashSpinSymbols = state.phase === "spin";
  const lockedStrip = state.phase === "stopped" || (state.phase === "stopping" && state.stopTarget === null);

  const bounceProgress = state.bounceTimer / LOCK_BOUNCE_DURATION;
  const bounceOffset =
    state.bounceTimer > 0
      ? -Math.sin(bounceProgress * Math.PI * 2.5) * 10 * (1 - bounceProgress)
      : 0;

  const columnStripSymbol = (relativeRowIdx) => {
    const idx = ((Math.floor(relativeRowIdx) % 3) + 3) % 3;
    return baseSymbols[idx];
  };

  const isGliding =
    state.phase === "spin" || (state.phase === "stopping" && state.stopTarget !== null);
  const renderScroll = isGliding ? scroll : Math.round(scroll);

  const symAt = (rowIdx) => {
    /** STOP 後は finalizeColumn で確定した3枚リールのみ（scrollStrip は回転中専用） */
    if (state.phase === "stopping" || state.phase === "stopped") {
      const relativeRow = Math.floor(rowIdx) - Math.floor(renderScroll);
      return columnStripSymbol(relativeRow);
    }
    if (scrollStrip?.length && state.phase === "spin") {
      return getStripSymbolAtRowIndex(rowIdx, scrollStrip) ?? "?";
    }
    if (lockedStrip && rowIdx >= 0 && rowIdx <= 2) return baseSymbols[rowIdx];
    if (hashSpinSymbols && scrollStrip?.length) {
      return getStripSymbolAtRowIndex(rowIdx, scrollStrip) ?? "?";
    }
    if (hashSpinSymbols && machine?.symbols?.length) {
      const pool = machine.symbols;
      const seed = Math.floor(scroll + rowIdx + colX * 0.17);
      return pool[((seed % pool.length) + pool.length) % pool.length];
    }
    if (rowIdx >= 0 && rowIdx <= 2) return baseSymbols[rowIdx];
    if (machine?.symbols?.length) {
      return machine.symbols[Math.abs(rowIdx) % machine.symbols.length];
    }
    return "?";
  };

  const rowCells = [];

  if (isGliding) {
    const { minRow, maxRow } = glidingRowRange(renderScroll);
    for (let ri = minRow; ri <= maxRow; ri += 1) {
      rowCells.push({
        rowIdx: ri,
        y: subpixelSnap(cellYFromScroll(ri, renderScroll, rowH, bounceOffset)),
      });
    }
  } else {
    const lockedScroll = renderScroll;
    for (let row = STRIP_ROW_RENDER_MIN; row <= STRIP_ROW_RENDER_MAX; row += 1) {
      const rowIdx = Math.floor(lockedScroll) - row;
      rowCells.push({
        rowIdx,
        y: subpixelSnap(cellYFromScroll(rowIdx, lockedScroll, rowH, bounceOffset)),
      });
    }
  }

  rowCells
    .sort((a, b) => a.y - b.y)
    .forEach(({ rowIdx, y }) => {
      if (y + rowH < -2 || y > h + 2) return;

      const sym = symAt(rowIdx);
      const rowCenterY = y + rowH / 2;
      const warp = getCylindricalWarp(y, rowH, h);
      const naturalCenterY = rowCenterY;
      const tuckTowardHub =
        Math.sign(naturalCenterY - h / 2) * (rowH * (1 - warp.scaleY)) * 0.45;
      const warpedCenterY = naturalCenterY + warp.offsetY + tuckTowardHub;

      let bright = rowBrightness(warpedCenterY, h);
      const isPayline = Math.abs(warpedCenterY - h / 2) < rowH * 0.34;
      let winScale = 1;
      let glow = 0;
      /** 目押し第3リール：当たり絵柄だけ明るく、他は少し暗く */
      const skillAimActive =
        skillAimSymbol && scrollStrip?.length && state.phase === "spin";
      if (skillAimActive) {
        if (sym === skillAimSymbol) {
          bright = Math.min(1, bright * SKILL_AIM_MATCH_BRIGHT_MULT);
          glow = isPayline ? SKILL_AIM_MATCH_GLOW_PAYLINE : SKILL_AIM_MATCH_GLOW_ROW;
        } else {
          bright *= SKILL_AIM_OTHER_BRIGHT_MULT;
        }
      }
      if (paylineWin && isPayline && lockedStrip) {
        const pulse = 0.5 + 0.5 * Math.sin(winPulse * WIN_PULSE_SPEED);
        winScale = 1 + 0.08 * pulse;
        glow = 0.3 + 0.55 * pulse;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(colX + 1, 0, colW - 2, h);
      ctx.clip();
      drawSymbol(
        ctx,
        sym,
        cx,
        warpedCenterY,
        fontSize,
        bright,
        glow,
        warp.scaleX,
        warp.scaleY,
        winScale,
      );
      ctx.restore();
    });

  if (bounce) {
    ctx.save();
    ctx.strokeStyle = "rgba(251, 191, 36, 0.55)";
    ctx.lineWidth = 2;
    ctx.strokeRect(colX + 1.5, 1.5, colW - 3, h - 3);
    ctx.restore();
  }

  if (slipActive) {
    ctx.save();
    ctx.strokeStyle = "rgba(248, 113, 113, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(colX + 2, h / 3 + 1, colW - 4, h / 3 - 2);
    ctx.restore();
  }
}

function columnIsSettled(st) {
  return (
    st.phase === "stopped" &&
    Math.abs(st.scrollRows) < SETTLED_SCROLL_EPS &&
    Math.abs(st.slipNudge) < SETTLED_SLIP_EPS &&
    st.stopTarget === null
  );
}

/**
 * 3列×3段スロット窓を Canvas で描画（円筒ドラム風・スポットライト・deltaTime 駆動）。
 * ゲームロジックは親が保持；表示とスクロール物理のみ担当。
 */
const SlotReelCanvasView = forwardRef(function SlotReelCanvasView(
  {
    reelColumns,
    columnSpinning,
    slipCols,
    bouncingCol = -1,
    paylineWinFx = false,
    reachCol = -1,
    machine,
    isSpinFrozenRef,
    /** 目押し時：列ごとの循環ストリップ（null なら従来ハッシュ） */
    columnScrollStrips = null,
    /** 目押し時：列ごとに光らせる絵柄（matchSymbol） */
    columnSkillAimSymbols = null,
    /** true の間は settled を通知しない（2リール停止時の当選マーク誤点灯防止） */
    spinSessionActive = false,
    onReelsSettledChange,
    className = "",
    style,
  },
  ref,
) {
  const canvasRef = useRef(null);
  const colStatesRef = useRef([makeColumnState(), makeColumnState(), makeColumnState()]);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const winPulseRef = useRef(0);
  const prevSpinningRef = useRef([false, false, false]);
  const prevColumnsRef = useRef(reelColumns);
  const settledRef = useRef(true);
  const onSettledRef = useRef(onReelsSettledChange);
  const spinSessionActiveRef = useRef(spinSessionActive);
  const columnSpinningRef = useRef(columnSpinning);
  const paylineWinFxRef = useRef(paylineWinFx);
  const bouncingColRef = useRef(bouncingCol);
  const slipColsRef = useRef(slipCols);
  const reachColRef = useRef(reachCol);
  const machineRef = useRef(machine);
  const columnManualStopRef = useRef([false, false, false]);
  const columnScrollStripsRef = useRef(columnScrollStrips);
  const columnSkillAimSymbolsRef = useRef(columnSkillAimSymbols);

  useImperativeHandle(
    ref,
    () => ({
      /** 目押し判定用：列の現在 scrollRows */
      getColumnScrollRows(colIdx) {
        const st = colStatesRef.current[colIdx];
        if (!st || !Number.isFinite(st.scrollRows)) return null;
        return st.scrollRows;
      },
      /** 実ストリップ列のペイライン絵柄（判定と描画を一致させる） */
      getPaylineSymbol(colIdx) {
        const st = colStatesRef.current[colIdx];
        const strip = columnScrollStripsRef.current?.[colIdx];
        if (!st || !strip?.length) return null;
        return getPaylineSymbolFromScrollStrip(st.scrollRows, strip);
      },
      /** STOP 押下直後：React 再描画を待たず glide 開始 */
      requestColumnStop(colIdx, symbols) {
        const st = colStatesRef.current[colIdx];
        if (!st || colIdx < 0 || colIdx > 2) return;
        columnManualStopRef.current[colIdx] = true;
        if (Array.isArray(symbols) && symbols.length === 3) {
          st.symbols = [...symbols];
        }
        beginColumnStopGlide(st);
      },
    }),
    [],
  );

  spinSessionActiveRef.current = spinSessionActive;
  columnScrollStripsRef.current = columnScrollStrips;
  columnSkillAimSymbolsRef.current = columnSkillAimSymbols;
  columnSpinningRef.current = columnSpinning;
  paylineWinFxRef.current = paylineWinFx;
  bouncingColRef.current = bouncingCol;
  slipColsRef.current = slipCols;
  reachColRef.current = reachCol;
  machineRef.current = machine;

  useEffect(() => {
    onSettledRef.current = onReelsSettledChange;
  }, [onReelsSettledChange]);

  useEffect(() => {
    const columns = Array.isArray(reelColumns) ? reelColumns : [];
    columns.forEach((col, i) => {
      const st = colStatesRef.current[i];
      if (!st || !Array.isArray(col) || col.length !== 3) return;
      const wasSpinning = prevSpinningRef.current[i];
      const nowSpinning = columnSpinning?.[i];
      const prevCol = prevColumnsRef.current?.[i];
      const colChanged = prevCol?.join?.() !== col.join?.();

      st.symbols = [...col];

      if (nowSpinning && !wasSpinning) {
        columnManualStopRef.current[i] = false;
        st.phase = "spin";
        st.stopTarget = null;
      } else if (!nowSpinning && (wasSpinning || st.phase === "spin")) {
        /** slot_only: STOP 押下 — 回転方向のまま stopTarget へ glide */
        beginColumnStopGlide(st);
      }

      if (!nowSpinning && colChanged && slipCols?.[i]) {
        st.slipNudge = 5;
      } else if (!nowSpinning && colChanged && !slipCols?.[i]) {
        st.slipNudge = 0;
      }
    });
    prevSpinningRef.current = columnSpinning?.map(Boolean) ?? [false, false, false];
    prevColumnsRef.current = columns;
  }, [reelColumns, columnSpinning, slipCols]);

  useEffect(() => {
    let cancelled = false;

    const emitSettled = (next) => {
      if (settledRef.current === next) return;
      settledRef.current = next;
      onSettledRef.current?.(next);
    };

    const tick = (ts) => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (!lastTsRef.current) lastTsRef.current = ts;
      /** slot_only: rAF delta cap */
      const dt = Math.min(
        MAX_DELTA_SECONDS,
        Math.max(0, (ts - lastTsRef.current) / 1000),
      );
      lastTsRef.current = ts;
      winPulseRef.current += dt;

      const frozen = typeof isSpinFrozenRef?.current === "number" && performance.now() < isSpinFrozenRef.current;
      const columnSpinningLive = columnSpinningRef.current;
      const anyColumnSpinning = columnSpinningLive?.some((s, i) => s && !frozen) ?? false;

      colStatesRef.current.forEach((st, i) => {
        if (st.bounceTimer > 0) {
          st.bounceTimer = Math.max(0, st.bounceTimer - dt);
        }

        const manualStop = columnManualStopRef.current[i];
        const wantsSpin = Boolean(columnSpinningLive?.[i]) && !manualStop;
        const spinning = wantsSpin && !frozen;

        if (spinning) {
          st.phase = "spin";
          st.stopTarget = null;
          /** slot_only: 等速回転（scrollRows 減少 = 下方向スクロール） */
          st.scrollRows -= SPIN_SPEED_ROWS * dt;
        } else if (frozen && Boolean(columnSpinningLive?.[i]) && !manualStop && st.phase === "spin") {
          /* リーチカットイン等：回転列は止めずスクロール位置を保持 */
        } else if (!wantsSpin && st.phase === "spin") {
          /** STOP 直後（useEffect より先に tick が来ても glide 開始） */
          beginColumnStopGlide(st);
        } else if (st.phase === "stopping" && st.stopTarget !== null) {
          /** slot_only: stopTarget へ回転方向 glide（scrollRows 減少側） */
          const remaining = st.stopTarget - st.scrollRows;
          const absRem = Math.abs(remaining);
          if (absRem <= SETTLED_SCROLL_EPS) {
            st.scrollRows = 0;
            st.stopTarget = null;
            st.phase = "stopped";
            st.bounceTimer = LOCK_BOUNCE_DURATION;
          } else {
            const inSnapZone = absRem <= MAX_SNAP_SLIDE_ROWS;
            const speed = inSnapZone ? SNAP_SLIDE_SPEED : SPIN_SPEED_ROWS;
            const slide = Math.min(absRem, speed * dt);
            st.scrollRows += Math.sign(remaining) * slide;
          }
        } else if (st.phase === "stopped") {
          st.scrollRows = 0;
          st.stopTarget = null;
        } else if (!wantsSpin && st.phase !== "stopping") {
          st.phase = "stopped";
          st.scrollRows = 0;
          st.stopTarget = null;
        }

        if (st.slipNudge > SETTLED_SLIP_EPS) {
          const k = 1 - Math.exp(-28 * dt);
          st.slipNudge += (0 - st.slipNudge) * k;
          if (st.slipNudge < SETTLED_SLIP_EPS) st.slipNudge = 0;
        }
      });

      const allColsSettled = colStatesRef.current.every(columnIsSettled);
      emitSettled(allColsSettled && !anyColumnSpinning && !spinSessionActiveRef.current);

      const parent = canvas.parentElement;
      if (!parent) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const gapPct = 5.64516129;
      const gap = (w * gapPct) / 100;
      const colW = (w - gap * 2) / 3;
      const rowH = h / 3;

      ctx.fillStyle = "#0a0d14";
      ctx.fillRect(0, 0, w, h);

      const paylineWin = paylineWinFxRef.current;
      const bounceCol = bouncingColRef.current;
      const slipLive = slipColsRef.current;
      const reachCi = reachColRef.current;
      const machineLive = machineRef.current;
      const scrollStripsLive = columnScrollStripsRef.current;
      const skillAimLive = columnSkillAimSymbolsRef.current;

      for (let ci = 0; ci < 3; ci += 1) {
        const colX = ci * (colW + gap);
        drawColumn(ctx, colX, colW, h, colStatesRef.current[ci], {
          paylineWin,
          bounce: bounceCol === ci,
          slipActive: slipLive?.[ci],
          machine: machineLive,
          winPulse: winPulseRef.current,
          scrollStrip: scrollStripsLive?.[ci] ?? null,
          skillAimSymbol: skillAimLive?.[ci] ?? null,
        });
        if (reachCi === ci) {
          ctx.save();
          ctx.strokeStyle = "rgba(251, 191, 36, 0.65)";
          ctx.lineWidth = 2;
          ctx.strokeRect(colX + 1, 1, colW - 2, h - 2);
          ctx.restore();
        }
      }

      /** slot_only: 窓陰影（上下帯のみ） */
      drawReelWindowLightingGradient(ctx, w, h, rowH);
      drawPaylineOverlay(ctx, w, h);
      rafRef.current = requestAnimationFrame(tick);
    };

    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      lastTsRef.current = 0;
    };
  }, [isSpinFrozenRef]);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`.trim()}
      style={style}
      aria-hidden
    />
  );
});

export default SlotReelCanvasView;

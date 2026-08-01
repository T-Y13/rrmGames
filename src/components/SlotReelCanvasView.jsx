import React, { useEffect, useRef } from "react";

/**
 * リール回転の滑らかさは参照プロジェクト slot_only（App.tsx）の方式を移植:
 * - offsets を float のまま進め、描画時だけ subpixelSnap
 * - rAF + deltaSeconds を MAX_DELTA_SECONDS でクランプ
 * - 回転は等速、停止は SNAP_SLIDE_SPEED で stopTarget へ滑走
 * - 停止ロック後に bounceOffset（reelBounceTimers）
 * - 円筒ワープ / 窓陰影は getCylindricalWarp・drawReelWindowLightingGradient 相当
 *
 * ゲームロジック・当たり判定は移植しない（表示物理のみ）。
 */

/** slot_only: タブ復帰時のジャンプ防止 */
const MAX_DELTA_SECONDS = 0.05;
/** slot_only: 回転中の帯速度（行/秒）。解像度に合わせて調整 */
const SPIN_SPEED_ROWS = 14.5;
/** slot_only: 停止滑走速度（行/秒） */
const SNAP_SLIDE_SPEED = 11.5;
/** slot_only: 停止開始時に余分に流すコマ数 */
const MAX_SNAP_SLIDE_SYMBOLS = 2.35;
const SETTLED_SCROLL_EPS = 0.001;
const SETTLED_SLIP_EPS = 0.35;
/** slot_only: 停止直後バウンス（秒）— CSS reelBounce 0.42s に合わせる */
const BOUNCE_DURATION_SEC = 0.42;
const BOUNCE_AMP_FRAC = 0.085;
const WIN_PULSE_SPEED = 3.6;

/** slot_only subpixelSnap — 描画座標だけ半ピクセルに丸めてシマーを抑える */
function subpixelSnap(v) {
  return Math.round(v * 2) / 2;
}

/**
 * slot_only cellYFromStripScroll 相当。
 * stripScroll は「何行分スクロールしたか」。row はストリップ上の整数スロット。
 */
function cellYFromStripScroll(stripScroll, row, rowStep, bounceOffset = 0) {
  return (row - stripScroll) * rowStep + bounceOffset;
}

/**
 * slot_only getCylindricalWarp — 中央付近は等倍、端は縦につぶして円筒感。
 * @returns {{ scaleY: number, brightness: number }}
 */
function getCylindricalWarp(rowCenterY, viewH) {
  const mid = viewH * 0.5;
  const half = viewH * 0.5;
  const t = Math.min(1, Math.abs(rowCenterY - mid) / half);
  // 端ほど強く潰す（EDGE 相当）
  const scaleY = 1 - t * t * 0.32;
  const brightness = 0.4 + (1 - t) * 0.6;
  return { scaleY: Math.max(0.62, scaleY), brightness };
}

/** slot_only drawReelWindowLightingGradient — 窓上下のビネット */
function drawReelWindowLightingGradient(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "rgba(0,0,0,0.9)");
  g.addColorStop(0.18, "rgba(0,0,0,0.48)");
  g.addColorStop(0.36, "rgba(0,0,0,0.08)");
  g.addColorStop(0.5, "rgba(0,0,0,0)");
  g.addColorStop(0.64, "rgba(0,0,0,0.08)");
  g.addColorStop(0.82, "rgba(0,0,0,0.48)");
  g.addColorStop(1, "rgba(0,0,0,0.9)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function normalizeScrollFrac(scrollRows) {
  let f = scrollRows - Math.floor(scrollRows);
  if (f < 0) f += 1;
  if (f > 0.5) f -= 1;
  return f;
}

/** slot_only glidingStripSlotRange — 回転中に描くストリップ範囲 */
function glidingStripSlotRange(stripScroll) {
  const first = Math.floor(stripScroll) - 1;
  const last = Math.ceil(stripScroll) + 3;
  return { first, last };
}

function bounceOffsetY(bounceT, rowH) {
  if (bounceT < 0 || bounceT >= BOUNCE_DURATION_SEC) return 0;
  const u = bounceT / BOUNCE_DURATION_SEC;
  // CSS reelBounce に近い多段オーバーシュート
  const wave =
    Math.sin(u * Math.PI) * (1 - u) * 1.15 - Math.sin(u * Math.PI * 2) * (1 - u) * 0.35;
  return wave * rowH * BOUNCE_AMP_FRAC;
}

function makeColumnState() {
  return {
    stripScroll: 0,
    phase: "idle",
    symbols: ["?", "?", "?"],
    slipNudge: 0,
    stopTarget: 0,
    /** slot_only reelBounceTimersRef 相当（経過秒。負 = 非アクティブ） */
    bounceT: -1,
  };
}

function drawSymbol(ctx, sym, cx, cy, fontSize, alpha, glow, scaleY, winScale) {
  const sy = scaleY * (winScale ?? 1);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, sy);
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
  { spinning, paylineWin, parentBounce, slipActive, machine, winPulse },
) {
  // slot_only: REEL_STRIP_STEP ≈ rowH（VERTICAL_GAP は窓高に内包）
  const rowStep = h / 3;
  const fontSize = Math.max(10, Math.min(colW * 0.52, rowStep * 0.62));
  const cx = colX + colW / 2;
  const lockedStrip = state.phase === "stopped" || state.phase === "stopping";
  // slot_only: 停止ロック時は Math.round(stripScroll) でピクセル安定
  const stripScroll = lockedStrip && state.phase === "stopped"
    ? Math.round(state.stripScroll)
    : state.stripScroll;

  const bounceFromTimer =
    state.bounceT >= 0 ? bounceOffsetY(state.bounceT, rowStep) : 0;
  const bounceOffset = bounceFromTimer + (parentBounce ? rowStep * 0.04 : 0);

  const baseSymbols = state.symbols.length === 3 ? state.symbols : ["?", "?", "?"];

  const symAt = (rowIdx) => {
    if (lockedStrip && rowIdx >= 0 && rowIdx <= 2) return baseSymbols[rowIdx];
    if (spinning && machine?.symbols?.length) {
      const pool = machine.symbols;
      const seed = Math.floor(stripScroll + rowIdx + colX * 0.17);
      return pool[((seed % pool.length) + pool.length) % pool.length];
    }
    if (rowIdx >= 0 && rowIdx <= 2) return baseSymbols[rowIdx];
    if (machine?.symbols?.length) {
      return machine.symbols[Math.abs(rowIdx) % machine.symbols.length];
    }
    return "?";
  };

  const { first, last } = lockedStrip && state.phase === "stopped"
    ? { first: -1, last: 3 }
    : glidingStripSlotRange(stripScroll);

  for (let ri = first; ri <= last; ri += 1) {
    let y = cellYFromStripScroll(stripScroll, ri, rowStep, bounceOffset + state.slipNudge);
    // 回転中は subpixelSnap、完全停止は整数ピクセル寄り
    y = state.phase === "stopped" ? Math.round(y) : subpixelSnap(y);
    if (y + rowStep < -2 || y > h + 2) continue;

    const sym = symAt(ri);
    const rowCenterY = y + rowStep / 2;
    const { scaleY, brightness } = getCylindricalWarp(rowCenterY, h);
    const isPayline = Math.abs(rowCenterY - h / 2) < rowStep * 0.34;
    let winScale = 1;
    let glow = 0;
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
      subpixelSnap(cx),
      rowCenterY,
      fontSize,
      brightness,
      glow,
      scaleY,
      winScale,
    );
    ctx.restore();
  }

  if (parentBounce || state.bounceT >= 0) {
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
    Math.abs(st.stripScroll) < SETTLED_SCROLL_EPS &&
    Math.abs(st.slipNudge) < SETTLED_SLIP_EPS &&
    st.bounceT < 0
  );
}

/**
 * 3列×3段スロット窓を Canvas で描画（円筒ドラム風・スポットライト・deltaTime 駆動）。
 * ゲームロジックは親が保持；表示とスクロール物理のみ担当。
 */
export default function SlotReelCanvasView({
  reelColumns,
  columnSpinning,
  slipCols,
  bouncingCol = -1,
  paylineWinFx = false,
  reachCol = -1,
  machine,
  isSpinFrozenRef,
  /** true の間は settled を通知しない（2リール停止時の当選マーク誤点灯防止） */
  spinSessionActive = false,
  onReelsSettledChange,
  className = "",
  style,
}) {
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

  spinSessionActiveRef.current = spinSessionActive;
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
    reelColumns.forEach((col, i) => {
      const st = colStatesRef.current[i];
      if (!Array.isArray(col) || col.length !== 3) return;
      const wasSpinning = prevSpinningRef.current[i];
      const nowSpinning = columnSpinning?.[i];
      const prevCol = prevColumnsRef.current?.[i];
      const colChanged = prevCol?.join?.() !== col.join?.();

      st.symbols = [...col];

      if (nowSpinning && !wasSpinning) {
        st.phase = "spin";
        st.bounceT = -1;
      } else if (!nowSpinning && (wasSpinning || st.phase === "spin")) {
        // slot_only: stopTargetsRef — 等速滑走で 0 に着地するよう余分に流す
        st.phase = "stopping";
        const frac = normalizeScrollFrac(st.stripScroll);
        st.stripScroll = frac - MAX_SNAP_SLIDE_SYMBOLS;
        st.stopTarget = 0;
      }

      if (!nowSpinning && colChanged && slipCols?.[i]) {
        st.slipNudge = 5;
      } else if (!nowSpinning && colChanged && !slipCols?.[i]) {
        st.slipNudge = 0;
      }
    });
    prevSpinningRef.current = columnSpinning?.map(Boolean) ?? [false, false, false];
    prevColumnsRef.current = reelColumns;
  }, [reelColumns, columnSpinning, slipCols]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const emitSettled = (next) => {
      if (settledRef.current === next) return;
      settledRef.current = next;
      onSettledRef.current?.(next);
    };

    // slot_only animate() — rAF + deltaSeconds クランプ
    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const deltaSeconds = Math.min(MAX_DELTA_SECONDS, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;
      winPulseRef.current += deltaSeconds;

      const frozen =
        typeof isSpinFrozenRef?.current === "number" && performance.now() < isSpinFrozenRef.current;
      const columnSpinningLive = columnSpinningRef.current;
      const anyColumnSpinning = columnSpinningLive?.some((s) => s && !frozen) ?? false;

      colStatesRef.current.forEach((st, i) => {
        const wantsSpin = Boolean(columnSpinningLive?.[i]);
        const spinning = wantsSpin && !frozen;

        if (spinning) {
          st.phase = "spin";
          // slot_only: offsetsRef[i] += speed * dt（ここでは上→下流れのため減算）
          st.stripScroll -= SPIN_SPEED_ROWS * deltaSeconds;
          st.bounceT = -1;
        } else if (frozen && wantsSpin && st.phase === "spin") {
          /* リーチカットイン等：回転列は止めずスクロール位置を保持 */
        } else if (st.phase === "stopping") {
          // slot_only: stopTargetsRef へ SNAP_SLIDE_SPEED で等速接近
          const dist = st.stopTarget - st.stripScroll;
          const maxStep = SNAP_SLIDE_SPEED * deltaSeconds;
          if (Math.abs(dist) <= maxStep) {
            st.stripScroll = st.stopTarget;
            st.phase = "stopped";
            st.bounceT = 0;
          } else {
            st.stripScroll += Math.sign(dist) * maxStep;
          }
        } else if (st.phase === "stopped") {
          st.stripScroll = 0;
          if (st.bounceT >= 0) {
            st.bounceT += deltaSeconds;
            if (st.bounceT >= BOUNCE_DURATION_SEC) st.bounceT = -1;
          }
        } else if (!wantsSpin) {
          st.phase = "stopped";
          st.stripScroll = 0;
        }

        if (st.slipNudge > SETTLED_SLIP_EPS) {
          const k = 1 - Math.exp(-28 * deltaSeconds);
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const gapPct = 5.64516129;
      const gap = (w * gapPct) / 100;
      const colW = (w - gap * 2) / 3;

      ctx.fillStyle = "#0a0d14";
      ctx.fillRect(0, 0, w, h);

      const paylineWin = paylineWinFxRef.current;
      const bounceCol = bouncingColRef.current;
      const slipLive = slipColsRef.current;
      const reachCi = reachColRef.current;
      const machineLive = machineRef.current;

      for (let ci = 0; ci < 3; ci += 1) {
        const colX = ci * (colW + gap);
        drawColumn(ctx, colX, colW, h, colStatesRef.current[ci], {
          spinning: columnSpinningLive?.[ci] && !frozen,
          paylineWin,
          parentBounce: bounceCol === ci,
          slipActive: slipLive?.[ci],
          machine: machineLive,
          winPulse: winPulseRef.current,
        });
        if (reachCi === ci) {
          ctx.save();
          ctx.strokeStyle = "rgba(251, 191, 36, 0.65)";
          ctx.lineWidth = 2;
          ctx.strokeRect(colX + 1, 1, colW - 2, h - 2);
          ctx.restore();
        }
      }

      drawReelWindowLightingGradient(ctx, w, h);
      drawPaylineOverlay(ctx, w, h);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
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
}

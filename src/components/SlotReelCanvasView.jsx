import React, { useEffect, useRef } from "react";

const EDGE_SCALE_Y = 0.7;
const SPIN_SPEED_ROWS = 8.2;
const STOP_SNAP_RATE = 22;
const WIN_PULSE_SPEED = 3.6;
const SETTLED_SCROLL_EPS = 0.0015;
const SETTLED_SLIP_EPS = 0.4;

function rowScaleY(rowCenterY, viewH) {
  const mid = viewH * 0.5;
  const dist = Math.abs(rowCenterY - mid) / (viewH / 3);
  if (dist < 0.35) return 1;
  return EDGE_SCALE_Y;
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
  };
}

function normalizeScrollFrac(scrollRows) {
  let f = scrollRows - Math.floor(scrollRows);
  if (f < 0) f += 1;
  if (f > 0.5) f -= 1;
  return f;
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

function drawSpotlight(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "rgba(0,0,0,0.88)");
  g.addColorStop(0.22, "rgba(0,0,0,0.42)");
  g.addColorStop(0.38, "rgba(0,0,0,0.06)");
  g.addColorStop(0.5, "rgba(0,0,0,0)");
  g.addColorStop(0.62, "rgba(0,0,0,0.06)");
  g.addColorStop(0.78, "rgba(0,0,0,0.42)");
  g.addColorStop(1, "rgba(0,0,0,0.88)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
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
  { spinning, paylineWin, bounce, slipActive, machine, winPulse },
) {
  const rowH = h / 3;
  const fontSize = Math.max(10, Math.min(colW * 0.52, rowH * 0.62));
  const cx = colX + colW / 2;
  const scroll = state.scrollRows;
  const baseSymbols = state.symbols.length === 3 ? state.symbols : ["?", "?", "?"];
  const lockedStrip = state.phase === "stopped" || state.phase === "stopping";

  const symAt = (rowIdx) => {
    if (lockedStrip && rowIdx >= 0 && rowIdx <= 2) return baseSymbols[rowIdx];
    if (spinning && machine?.symbols?.length) {
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

  const firstRow = Math.floor(scroll) - 1;
  const lastRow = Math.ceil(scroll) + 3;

  for (let ri = firstRow; ri <= lastRow; ri += 1) {
    const y = (ri - scroll) * rowH + state.slipNudge;
    if (y + rowH < -2 || y > h + 2) continue;

    const sym = symAt(ri);
    const rowCenterY = y + rowH / 2;
    const scaleY = rowScaleY(rowCenterY, h);
    const bright = rowBrightness(rowCenterY, h);
    const isPayline = Math.abs(rowCenterY - h / 2) < rowH * 0.34;
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
    drawSymbol(ctx, sym, cx, rowCenterY, fontSize, bright, glow, scaleY, winScale);
    ctx.restore();
  }

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
    Math.abs(st.slipNudge) < SETTLED_SLIP_EPS
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
      } else if (!nowSpinning && (wasSpinning || st.phase === "spin")) {
        st.phase = "stopping";
        st.scrollRows = normalizeScrollFrac(st.scrollRows);
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

    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min(0.032, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;
      winPulseRef.current += dt;

      const frozen = typeof isSpinFrozenRef?.current === "number" && performance.now() < isSpinFrozenRef.current;
      const columnSpinningLive = columnSpinningRef.current;
      const anyColumnSpinning = columnSpinningLive?.some((s, i) => s && !frozen) ?? false;

      colStatesRef.current.forEach((st, i) => {
        const wantsSpin = Boolean(columnSpinningLive?.[i]);
        const spinning = wantsSpin && !frozen;

        if (spinning) {
          st.phase = "spin";
          st.scrollRows -= SPIN_SPEED_ROWS * dt;
        } else if (frozen && wantsSpin && st.phase === "spin") {
          /* リーチカットイン等：回転列は止めずスクロール位置を保持 */
        } else if (st.phase === "stopping") {
          const k = 1 - Math.exp(-STOP_SNAP_RATE * dt);
          st.scrollRows += (0 - st.scrollRows) * k;
          if (Math.abs(st.scrollRows) < SETTLED_SCROLL_EPS) {
            st.scrollRows = 0;
            st.phase = "stopped";
          }
        } else if (st.phase === "stopped") {
          st.scrollRows = 0;
        } else if (!wantsSpin) {
          st.phase = "stopped";
          st.scrollRows = 0;
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
          bounce: bounceCol === ci,
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

      drawSpotlight(ctx, w, h);
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

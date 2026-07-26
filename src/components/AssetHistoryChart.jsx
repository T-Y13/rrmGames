import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  buildAssetHistoryChartData,
  buildAssetHistoryXAxisOrderTicks,
  formatAssetHistoryOrderLabel,
} from "../utils/assetHistoryFromGameState";

function formatMoney(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return `${value >= 0 ? "+" : ""}${value.toLocaleString()}G`;
}

function AssetHistoryTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-600/80 bg-slate-950/95 px-3 py-2.5 shadow-xl text-xs space-y-1.5 min-w-[10rem]">
      <p className="font-bold text-slate-200 border-b border-slate-700/80 pb-1 mb-1">{label}</p>
      {payload.map((item) => (
        <div key={item.dataKey} className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span
              className="inline-block h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
              aria-hidden
            />
            {item.name}
          </span>
          <span className="font-mono font-semibold tabular-nums text-slate-100">
            {formatMoney(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

function formatTooltipLabel(order, payload) {
  const row = payload?.[0]?.payload;
  if (row?.time) return String(row.time);
  return formatAssetHistoryOrderLabel(order);
}

/**
 * 結果画面用：全プレイヤーの資産推移（1〜7日目 + 8日目 T1–15）
 */
export default function AssetHistoryChart({ gameState }) {
  const { chartData, playerSeries, day8TransitionOrder, xDomain, yDomain } = useMemo(
    () => buildAssetHistoryChartData(gameState),
    [gameState],
  );
  const xAxisOrderTicks = useMemo(() => buildAssetHistoryXAxisOrderTicks(), []);

  if (!chartData.length || !playerSeries.length) return null;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 md:p-5 space-y-3">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-200 tracking-wide">資産推移</h3>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          1〜7日目は日次終了時、8日目は各ターン終了時の所持金
        </p>
      </div>
      <div className="h-[min(420px,55vh)] w-full min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 12, right: 12, left: 4, bottom: 28 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              type="number"
              dataKey="order"
              domain={xDomain}
              ticks={xAxisOrderTicks}
              tickFormatter={formatAssetHistoryOrderLabel}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              axisLine={{ stroke: "#475569" }}
              tickLine={{ stroke: "#475569" }}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={52}
            />
            <YAxis
              domain={yDomain}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              axisLine={{ stroke: "#475569" }}
              tickLine={{ stroke: "#475569" }}
              tickFormatter={(v) => `${v}G`}
              width={56}
            />
            <Tooltip content={<AssetHistoryTooltip />} labelFormatter={formatTooltipLabel} />
            <Legend
              wrapperStyle={{ fontSize: "11px", color: "#cbd5e1", paddingTop: "8px" }}
              iconType="line"
            />
            <ReferenceLine
              x={day8TransitionOrder}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: "8日目",
                position: "insideTopLeft",
                fill: "#fbbf24",
                fontSize: 11,
                fontWeight: 700,
              }}
            />
            {playerSeries.map((s, idx) => (
              <Line
                key={s.id}
                type="monotone"
                dataKey={s.key}
                name={s.key}
                stroke={s.color}
                strokeWidth={idx === 0 ? 2.5 : 2}
                dot={{ r: 2.5, strokeWidth: 0, fill: s.color }}
                activeDot={{ r: 5, stroke: "#0f172a", strokeWidth: 2 }}
                connectNulls
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

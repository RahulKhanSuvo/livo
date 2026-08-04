import { useId } from 'react';

import { cn } from '@/lib/utils';

export function AreaChart({
  data,
  height = 220,
  color = '#4b6b56',
  className,
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  className?: string;
}) {
  const id = useId();
  const w = 600;
  const h = height;
  const pad = 10;
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => [
    pad + i * step,
    pad + (h - pad * 2) - (d.value / max) * (h - pad * 2),
  ]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(2)},${h - pad} L ${pts[0][0].toFixed(2)},${h - pad} Z`;

  return (
    <div className={cn('w-full', className)}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full overflow-visible">
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={w - pad}
            y1={pad + (h - pad * 2) * f}
            y2={pad + (h - pad * 2) * f}
            stroke="#000"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        ))}
        <path d={area} fill={`url(#${id}-fill)`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r={i === pts.length - 1 ? 4 : 2.5}
            fill={color}
            stroke="#fff"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  data,
  height = 180,
  color = '#d98e63',
  className,
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="text-[11px] font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {d.value}
            </span>
            <div
              title={`${d.label}: ${d.value}`}
              className="w-full max-w-10 rounded-t-md transition-opacity group-hover:opacity-80"
              style={{ height: `${(d.value / max) * (height - 28)}px`, backgroundColor: color }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between gap-2 text-[11px] text-muted-foreground">
        {data.map((d) => (
          <span key={d.label} className="flex-1 truncate text-center">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DonutChart({
  segments,
  centerLabel,
  centerValue,
  size = 190,
  strokeWidth = 22,
  className,
}: {
  segments: { label: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const arcs: { label: string; color: string; len: number; offset: number }[] = [];
  let running = 0;
  for (const s of segments) {
    const len = (s.value / total) * c;
    arcs.push({ label: s.label, color: s.color, len, offset: -running });
    running += len;
  }

  return (
    <div className={cn('flex items-center gap-6', className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="size-full -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#000"
            strokeOpacity="0.06"
            strokeWidth={strokeWidth}
          />
          {arcs.map((s) => (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${s.len} ${c - s.len}`}
              strokeDashoffset={s.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-semibold text-foreground">{centerValue}</span>
          {centerLabel && <span className="text-[11px] text-muted-foreground">{centerLabel}</span>}
        </div>
      </div>
      <div className="space-y-2.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 text-sm">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-foreground/80">{s.label}</span>
            <span className="ml-auto font-semibold text-foreground">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sparkline({
  points,
  color = '#4b6b56',
  className,
}: {
  points: number[];
  color?: string;
  className?: string;
}) {
  const w = 120;
  const h = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const pts = points.map((p, i) => [i * step, h - ((p - min) / range) * (h - 4) - 2]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('h-auto w-full', className)}>
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
}
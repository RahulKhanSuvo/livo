'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { cn } from '@/lib/utils';

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
  const outerRadius = size / 2 - 2;
  const innerRadius = outerRadius - strokeWidth;

  return (
    <div className={cn('flex flex-col items-center gap-5', className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={1.5}
              stroke="none"
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            >
              {segments.map((s) => (
                <Cell key={s.label} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-semibold text-foreground">{centerValue}</span>
          {centerLabel && <span className="text-[11px] text-muted-foreground">{centerLabel}</span>}
        </div>
      </div>
      <div className="w-full max-w-[260px] space-y-2.5">
        {segments.map((s) => {
          const total = segments.reduce((a, x) => a + x.value, 0);
          return (
            <div key={s.label} className="flex items-center gap-2.5 text-sm">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-foreground/80">{s.label}</span>
              <span className="ml-auto font-semibold text-foreground">
                {Math.round((s.value / total) * 100)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

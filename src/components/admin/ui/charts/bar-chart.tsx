'use client';

import { Bar, BarChart as ReBarChart, ResponsiveContainer, Tooltip } from 'recharts';

import { cn } from '@/lib/utils';

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
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid rgba(0,0,0,0.08)',
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="value"
            fill={color}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
            isAnimationActive
            animationDuration={800}
            animationEasing="ease-out"
          />
        </ReBarChart>
      </ResponsiveContainer>
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

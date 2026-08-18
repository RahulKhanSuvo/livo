'use client';

import { useId } from 'react';
import { Area, AreaChart as ReAreaChart, ResponsiveContainer, Tooltip } from 'recharts';

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
  const id = useId().replace(/:/g, '');
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ReAreaChart data={data} margin={{ top: 10, right: 6, left: 6, bottom: 0 }}>
          <defs>
            <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={`url(#${id}-fill)`}
            dot={{ r: 2.5, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 4, fill: color, stroke: '#fff', strokeWidth: 1.5 }}
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-out"
          />
          <Tooltip
            cursor={{ stroke: color, strokeOpacity: 0.3, strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid rgba(0,0,0,0.08)',
              fontSize: 12,
            }}
            labelStyle={{ color: 'rgba(0,0,0,0.55)', fontWeight: 600 }}
            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Sales']}
          />
        </ReAreaChart>
      </ResponsiveContainer>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

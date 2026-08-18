import { cn } from '@/lib/utils';

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
  const line = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('h-auto w-full', className)}>
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
}

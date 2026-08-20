import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons';

import type { AdminIcon } from '@/components/admin/ui/icon';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  delta,
  trend = 'up',
  icon,
  hint,
  accent = 'var(--primary)',
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down';
  icon: AdminIcon;
  hint?: string;
  accent?: string;
}) {
  return (
    <Card className="bg-white shadow-[0_1px_2px_rgba(28,39,32,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-12px_rgba(28,39,32,0.18)]">
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              {label}
            </p>
            <p className="mt-2 font-serif text-[34px] leading-none font-semibold tracking-tight text-foreground">
              {value}
            </p>
          </div>
          <span
            className="grid size-10 shrink-0 place-items-center rounded-sm ring-1 ring-inset"
            style={{
              backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)`,
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
            }}
          >
            <HugeiconsIcon icon={icon} size={19} strokeWidth={2} />
          </span>
        </div>

        {(delta || hint) && (
          <div className="flex items-center gap-2 text-xs">
            {delta && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold',
                  trend === 'up'
                    ? 'bg-emerald-600/10 text-emerald-700'
                    : 'bg-destructive/10 text-destructive'
                )}
              >
                <HugeiconsIcon
                  icon={trend === 'up' ? ArrowUp01Icon : ArrowDown01Icon}
                  size={12}
                  strokeWidth={2.5}
                />
                {delta}
              </span>
            )}
            {hint && <span className="text-muted-foreground">{hint}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

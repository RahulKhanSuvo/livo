import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function FormSection({ title, description, action, children, className }: FormSectionProps) {
  return (
    <section
      className={cn(
        'rounded-sm bg-card p-5 shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/[0.06] sm:p-6',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h2 className="font-heading text-[15px] font-semibold leading-none text-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-[13px] leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default FormSection;

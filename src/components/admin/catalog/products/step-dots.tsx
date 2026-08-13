import { cn } from '@/lib/utils';

export function StepDots({ step, count }: { step: number; count: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            'h-1 flex-1 rounded-full transition-colors',
            i <= step ? 'bg-primary' : 'bg-border'
          )}
        />
      ))}
    </div>
  );
}

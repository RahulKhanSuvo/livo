'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FieldShape {
  name: string;
  state: {
    value: string;
    meta: { errors: Array<{ message?: string } | string | undefined> };
  };
  handleChange: (value: string) => void;
  handleBlur: () => void;
}

interface AuthFieldProps {
  field: FieldShape;
  label: string;
  type?: 'text' | 'email' | 'password' | 'name';
  placeholder?: string;
  autoComplete?: string;
}

export function AuthField({
  field,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const errors = field.state.meta.errors;
  const error = errors.length > 0 ? errors[0] : undefined;
  const hasError = !!error;

  return (
    <div className="space-y-2">
      <label
        htmlFor={field.name}
        className={cn(
          'flex items-center justify-between text-xs font-medium tracking-wider uppercase',
          hasError ? 'text-destructive' : 'text-primary/60'
        )}
      >
        {label}
      </label>

      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={inputType}
          value={field.state.value ?? ''}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          className={cn(isPassword && 'pr-11')}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-primary/45 transition-colors hover:text-primary"
          >
            <HugeiconsIcon
              icon={showPassword ? ViewOffIcon : ViewIcon}
              size={18}
              strokeWidth={1.8}
            />
          </button>
        )}
      </div>

      {hasError && (
        <p className="text-xs font-medium text-destructive" role="alert">
          {typeof error === 'string' ? error : (error?.message ?? 'Invalid value')}
        </p>
      )}
    </div>
  );
}

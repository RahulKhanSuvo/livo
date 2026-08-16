import { z } from 'zod';
import { handleServerError } from './handleServerError';

export type ActionResponse<T> = {
  success: boolean;
  message?: string;
  data?: T | null;
  fieldErrors?: Record<string, string[]>;
};

export interface SafeActionOptions {
  successMessage?: string;
}

export function createSafeAction<TInput, TOutput, TContext = undefined>(
  schema: z.ZodSchema<TInput> | null,
  handler: (data: TInput, context?: TContext) => Promise<TOutput>,
  options?: SafeActionOptions
) {
  return async (input?: TInput, context?: TContext): Promise<ActionResponse<TOutput>> => {
    try {
      let validatedData: TInput;

      if (schema) {
        const result = schema.safeParse(input);

        if (!result.success) {
          const flattened = result.error.flatten((issue) => issue.message);

          return {
            success: false,
            message: 'Validation failed. Please check your inputs.',
            fieldErrors: flattened.fieldErrors as Record<string, string[]>,
          };
        }

        validatedData = result.data;
      } else {
        validatedData = input as TInput;
      }

      const data = await handler(validatedData, context);

      return {
        success: true,
        data: JSON.parse(JSON.stringify(data)),
        message: options?.successMessage ?? 'Action executed successfully',
      };
    } catch (error: unknown) {
      // Let Next.js framework errors pass through.
      if (isNextRedirectError(error)) {
        throw error;
      }

      console.error('[SERVER ACTION ERROR]', error);

      return {
        success: false,
        message: handleServerError(error),
      };
    }
  };
}

function isNextRedirectError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof error.digest === 'string' &&
    error.digest.startsWith('NEXT_REDIRECT')
  );
}

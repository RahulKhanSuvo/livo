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
  schema: z.ZodSchema<TInput>,
  handler: (validatedData: TInput, context: TContext) => Promise<TOutput>,
  options?: SafeActionOptions
) {
  return async (input: TInput, context: TContext): Promise<ActionResponse<TOutput>> => {
    const validation = schema.safeParse(input);

    if (!validation.success) {
      const flattened = validation.error.flatten((issue) => issue.message);

      return {
        success: false,
        message: 'Validation failed. Please check your inputs.',
        fieldErrors: flattened.fieldErrors as Record<string, string[]>,
      };
    }

    try {
      const rawResult = await handler(validation.data, context);

      const serializedData = rawResult == null ? null : JSON.parse(JSON.stringify(rawResult));

      return {
        success: true,
        data: serializedData,
        message: options?.successMessage ?? 'Action executed successfully',
      };
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'digest' in error &&
        typeof (error as Record<string, unknown>).digest === 'string' &&
        (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')
      ) {
        throw error;
      }

      console.error('[SERVER ACTION ERROR]:', error);

      return {
        success: false,
        message: handleServerError(error),
      };
    }
  };
}

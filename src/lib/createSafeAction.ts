import { z } from 'zod';
import { handleServerError } from './handleServerError';

export type ActionResponse<T> = {
  success: boolean;
  message?: string;
  data?: T | null;
  fieldErrors?: Record<string, string[]>;
};

export function createSafeAction<TInput, TOutput>(
  schema: z.ZodSchema<TInput>,
  handler: (validatedData: TInput) => Promise<TOutput>
) {
  return async (input: TInput): Promise<ActionResponse<TOutput>> => {
    // 1. Zod Validation
    const validation = schema.safeParse(input);
    if (!validation.success) {
      // Pass a mapper function (issue => issue.message) to suppress the deprecation warning
      const flattened = validation.error.flatten((issue) => issue.message);

      return {
        success: false,
        message: 'Validation failed. Please check your inputs.',
        fieldErrors: flattened.fieldErrors as Record<string, string[]>,
      };
    }

    // 2. Execute Action & Catch Errors
    try {
      const rawResult = await handler(validation.data);

      // 3. Auto-serialize Prisma Decimals/Dates so client components never crash
      const serializedData = JSON.parse(JSON.stringify(rawResult));

      return {
        success: true,
        data: serializedData,
        message: 'Action executed successfully',
      };
    } catch (error) {
      console.error('[SERVER ACTION ERROR]:', error);

      return {
        success: false,
        message: handleServerError(error),
      };
    }
  };
}

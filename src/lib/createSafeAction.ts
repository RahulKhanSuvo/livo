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

// Overload 1: With Zod Schema
export function createSafeAction<TInput, TOutput, TContext = undefined>(
  schema: z.ZodSchema<TInput>,
  handler: (data: TInput, context?: TContext) => Promise<TOutput>,
  options?: SafeActionOptions
): (input?: TInput, context?: TContext) => Promise<ActionResponse<TOutput>>;
//        ^ Note the '?' mark added here

// Overload 2: Without Schema (Direct parameter / Void execution)
export function createSafeAction<TInput = void, TOutput = unknown, TContext = undefined>(
  handler: (data: TInput, context?: TContext) => Promise<TOutput>,
  options?: SafeActionOptions
): (input?: TInput, context?: TContext) => Promise<ActionResponse<TOutput>>;

// Implementation
export function createSafeAction<TInput, TOutput, TContext = undefined>(
  schemaOrHandler: z.ZodSchema<TInput> | ((data: TInput, context?: TContext) => Promise<TOutput>),
  handlerOrOptions?: ((data: TInput, context?: TContext) => Promise<TOutput>) | SafeActionOptions,
  options?: SafeActionOptions
) {
  let schema: z.ZodSchema<TInput> | null = null;
  let handler: (data: TInput, context?: TContext) => Promise<TOutput>;
  let actionOptions: SafeActionOptions | undefined = options;

  if (typeof schemaOrHandler === 'function') {
    // Called without schema: createSafeAction(handler, options)
    handler = schemaOrHandler;
    actionOptions = handlerOrOptions as SafeActionOptions | undefined;
  } else {
    // Called with schema: createSafeAction(schema, handler, options)
    schema = schemaOrHandler;
    handler = handlerOrOptions as (data: TInput, context?: TContext) => Promise<TOutput>;
  }

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
        data: data ? (JSON.parse(JSON.stringify(data)) as TOutput) : null,
        message: actionOptions?.successMessage ?? 'Action executed successfully',
      };
    } catch (error: unknown) {
      if (isNextFrameworkError(error)) {
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

function isNextFrameworkError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null && 'digest' in error) {
    const digest = String((error as { digest?: string }).digest);
    return digest.startsWith('NEXT_REDIRECT') || digest.startsWith('NEXT_NOT_FOUND');
  }
  return false;
}

import { Prisma } from '@/generated/prisma/client';

export function handleServerError(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        const target = (error.meta?.target as string[])?.join(', ') || 'field';
        return `A record with this ${target} already exists. Please use a unique value.`;
      }
      case 'P2025':
        return 'The requested record was not found in the database.';
      case 'P2003':
        return 'Foreign key constraint failed. Related record does not exist.';
      default:
        return `Database error (${error.code}). Please try again.`;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected server error occurred.';
}

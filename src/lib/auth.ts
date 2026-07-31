import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import prisma from './prisma';
import { Role } from '@/generated/prisma/enums';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  // additional data
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: Role.USER,
      },
    },
  },
});

// import { PrismaClient } from '@prisma/client'
// export const prisma = new PrismaClient();


import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error'], // Optional: Log errors for debugging
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
'use server';
import prisma from '@/lib/prisma';

export async function getAllProducts() {
  try {
    const res = await prisma.product.findMany();
    console.log('sever prove', res);
    return res;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

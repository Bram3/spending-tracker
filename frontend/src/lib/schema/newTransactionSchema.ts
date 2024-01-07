import { z } from 'zod';

export const newTransactionSchema = z.object({ categoryId: z.number(), supplierId: z.number(), date: z.string(), description: z.string().min(3), amount: z.number(), paymentMethod: z.string().min(3) });

export type newTransactionSchemaType = typeof newTransactionSchema; 
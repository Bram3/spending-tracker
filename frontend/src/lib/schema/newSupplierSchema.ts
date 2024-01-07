import { z } from 'zod';

export const newSupplierSchema = z.object({ name: z.string().min(3), defaultCategoryId: z.number() });

export type newSupplierSchemaType = typeof newSupplierSchema; 
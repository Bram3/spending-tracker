import { z } from 'zod';

export const newCategorySchema = z.object({ name: z.string().min(3) });

export type newCategorySchemaType = typeof newCategorySchema; 
import z from 'zod';

export const paramValidationSchema = z
  .object({
    id: z
      .string()
      .transform(Number)
      .refine(n => !isNaN(n) && n > 0, 'ID must be a positive number'),
  })
  .strict();

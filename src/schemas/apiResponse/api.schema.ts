import { z } from "zod";

export const baseApiSchema = z.object({
  errors: z.any().optional(),
  success: z.boolean(),
  message: z.string(),
});

export const paginatedApiSchema = baseApiSchema.extend({
  pagination: z.object({
    total: z.number(),
    perPage: z.number(),
    currentPage: z.number(),
  }),
});

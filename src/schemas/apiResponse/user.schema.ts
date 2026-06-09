import { z } from "zod";

export const AnyTypeSchema = z.any();

//
export const UserDataSchema = z.object({
  id: z.string(),
  userNumber: z.number(),
  username: z.string(),
  email: z.string(),
  isEmailVerified: z.boolean(),
  lastLoggedInAt: z.string().nullable(),
  lastLoggedInIp: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});
export type User = z.output<typeof UserDataSchema>;

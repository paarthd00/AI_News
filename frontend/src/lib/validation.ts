import * as z from "zod";

export const formSchema = z.object({
  type: z.string(),
  rating: z.number().min(0).max(5),
});

export const editSearchSchema = z.object({
  id: z.number(),
  type: z.string(),
  rating: z.number().min(0).max(5),
  createdAt: z.string(),
});

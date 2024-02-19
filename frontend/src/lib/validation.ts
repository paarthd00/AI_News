import * as z from "zod";

export const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const editSearchSchema = z.object({
  id: z.number(),
  title: z.string(),
  rating: z.number().min(0).max(5),
  createdAt: z.string(),
});

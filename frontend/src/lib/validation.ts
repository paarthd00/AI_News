import * as z from "zod";

export const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const editSearchSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
  createdAt: z.string(),
});

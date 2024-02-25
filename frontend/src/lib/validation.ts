import * as z from "zod";

export const aiPromptSchema = z.object({
  prompt: z.string(),
});

export const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  url: z.string(),
});

export const editSearchSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
  createdAt: z.string(),
});

export const singlePostSearchSchema = z.object({
  id: z.string(),
});

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  upVotes: z.number(),
  downVotes: z.number(),
  createdAt: z.string(),
});

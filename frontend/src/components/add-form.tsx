import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { formSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createPost } from "@/network";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function AddForm() {
  const Navigate = useNavigate();

  const { user } = useKindeAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      url:"",
    },
  });

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["postData"] }),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, content,url } = values;
    const authorId = user?.id || "";
    const authorName = user?.given_name || "";
    try {
      addPostMutation.mutate({ title, content, url, authorId, authorName });
    } catch (error) {
      alert("Error creating milk");
    } finally {
      Navigate({ to: "/" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="py-10 space-y-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>Write post title here...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="Url" {...field} />
              </FormControl>
              <FormDescription>Add external url here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Content" {...field} />
              </FormControl>
              <FormDescription>Write Post content here...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

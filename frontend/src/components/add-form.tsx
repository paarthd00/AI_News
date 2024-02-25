import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { formSchema, aiPromptSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createPost } from "@/network";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function AddForm() {
  const Navigate = useNavigate();
  const { user } = useKindeAuth();

  const aiHelpForm = useForm<z.infer<typeof aiPromptSchema>>({
    resolver: zodResolver(aiPromptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const addForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      url: "",
    },
  });

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["postData"] }),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, content, url } = values;
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

  const handleAIHelpSubmit = async (values: z.infer<typeof aiPromptSchema>) => {
    const { prompt } = values;
    try {
      const aiResponse = await fetch("/api/Posts/completepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Prompt: prompt,
          "MaxTokens": "60",
          "Temperature": "0.5"
        }),
      }).then((response) => response.json());

      addForm.setValue("content", aiResponse.choices[0].text);

    } catch (error) {
      alert("Error getting ai help");
    }
  }

  return (
    <>
      <Form {...addForm}>
        <form
          onSubmit={addForm.handleSubmit(handleSubmit)}
          className="py-10 px-4 space-y-10 flex items-center flex-col w-full max-w-[600px] mx-auto bg-white rounded-lg shadow-lg"
        >
          <FormField
            control={addForm.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormControl>
                  <Input className="rounded" placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addForm.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormControl>
                  <Input className="rounded" placeholder="External Post Url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-[100%] items-end gap-2 ">
            <FormField
              control={addForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-[100%] ">
                  <FormControl>
                    <Textarea className="rounded h-[20rem]" placeholder="Content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="btn bg-[#f0f0f0]" type="submit">Add New Post</Button>
          </div>
        </form>
      </Form>

      <Form {...aiHelpForm}>
        <form
          onSubmit={aiHelpForm.handleSubmit(handleAIHelpSubmit)}
          className="py-10 px-4  flex items-center gap-3  w-full max-w-[600px] mx-auto bg-white rounded-lg shadow-lg"
        >
          <FormField
            control={aiHelpForm.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormControl>
                  <Input className="rounded" placeholder="Write post about C++" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="btn bg-[#f0f0f0]">AI help</Button>
        </form>
      </Form>
    </>
  );
}

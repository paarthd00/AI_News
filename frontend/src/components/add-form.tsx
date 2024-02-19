import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { formSchema } from "@/lib/validation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { createMilk } from "@/network";

export default function AddForm() {

  const Navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      rating: 0,
    },
  })

  const addMilkMutation = useMutation({
    mutationFn: createMilk,
    onSettled: () => queryClient.invalidateQueries({ "queryKey": ["milkData"] })
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { type, rating } = values;
    try {
      addMilkMutation.mutate({ type, rating });
    } catch (error) {
      alert("Error creating milk");
    } finally {
      Navigate({ to: "/" })
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Milk type" {...field} />
              </FormControl>
              <FormDescription>
                This is the type of milk you are rating
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  min={0}
                  max={5}
                  type="number"
                  placeholder="Enter rating (0-5)"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Parse the input value as a number
                    field.onChange(value !== '' ? Number(value) : undefined);
                  }}
                />
              </FormControl>
              <FormDescription>
                Please enter a number between 0 and 5 for the rating.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

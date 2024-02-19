import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { Milk } from "@/network";
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
import { updateMilk } from "@/network";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { useNavigate } from "@tanstack/react-router";

export default function EditForm({
    milkId,
    milkType,
    milkRating,
    createdAt
}:
    {
        milkId: number,
        milkType: string,
        milkRating: number
        createdAt: string
    }) {
    const Navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: milkType,
            rating: milkRating,
        },
    })

    const editMilkMutation = useMutation({
        mutationFn: updateMilk,
        onSettled: () => queryClient.invalidateQueries({ "queryKey": ["milkData"] })
    });

    const handleEditMilk = async (values: z.infer<typeof formSchema>) => {
        const { type, rating } = values;

        if (!type || !rating || !milkId) {
            alert("Please fill out all fields")
            return
        }

        let newMilk: Milk = {
            id: milkId,
            type: "",
            rating: 0,
            createdAt: createdAt
        }; newMilk.type = type; newMilk.rating = rating;

        try {
            await editMilkMutation.mutateAsync({ "id": milkId, newMilk });
        } catch (error) {
            alert("Error editing milk");
            console.log(error);
        } finally {
            Navigate({ to: "/" })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditMilk)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value;
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

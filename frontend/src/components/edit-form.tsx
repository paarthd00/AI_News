
export default function EditForm() {
  // const Navigate = useNavigate();
  // const { user } = useKindeAuth();
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: title,
  //     content: content,
  //   },
  // });

  // const editPostMutation = useMutation({
  //   mutationFn: updatePost,
  //   onSettled: () => queryClient.invalidateQueries({ queryKey: ["postData"] }),
  // });

  // const handleEditMilk = async (values: z.infer<typeof formSchema>) => {
  //   const { title, content } = values;

  //   if (!title || !content || !postId) {
  //     alert("Please fill out all fields");
  //     return;
  //   }

  //   let newPost: Post = {
  //     id: postId,
  //     title: "",
  //     content: "",
  //     url: "",
  //     upVotes: 0,
  //     downVotes: 0,
  //     authorId: user?.id || "",
  //     authorName: user?.given_name || "",
  //     createdAt: createdAt,
  //   };
  //   newPost.title = title;
  //   newPost.content = content;

  //   try {
  //     await editPostMutation.mutateAsync({ id: postId, newPost });
  //   } catch (error) {
  //     alert("Error editing milk");
  //     console.log(error);
  //   } finally {
  //     Navigate({ to: "/" });
  //   }
  // };

  return (
    <>
    Edit Form
    </>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(handleEditMilk)} className="space-y-8">
    //     <FormField
    //       control={form.control}
    //       name="title"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Title</FormLabel>
    //           <FormControl>
    //             <Input {...field} />
    //           </FormControl>
    //           <FormDescription>Post Title</FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="content"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Rating</FormLabel>
    //           <FormControl>
    //             <Input {...field} />
    //           </FormControl>
    //           <FormDescription>
    //             please update post content here...
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </Form>
  );
}

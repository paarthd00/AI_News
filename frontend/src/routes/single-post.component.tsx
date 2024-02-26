import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { singlePostSearchSchema } from "@/lib/validation";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { deletePost } from "@/network";
export const Route = createFileRoute("/single-post")({
  validateSearch: singlePostSearchSchema,
});

export const component = function SinglePost() {
  const { id } = Route.useSearch();
  const Navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["singlePost", id],
    queryFn: async ({ queryKey }) => {
      const [_, id] = queryKey;
      const result = await fetch(`/api/AIPosts/${id}`);
      return await result.json();
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["postData"] }),
  });

  const deletePostHandler = async (id: number) => {
    try {
      await deletePostMutation.mutateAsync(id);
    } catch (error) {
      alert("Error deleting post");
    } finally {
      Navigate({ to: "/" });
    }
  }

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <div className="container">
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p>{data.authorName}</p>
      <p>{data.createdAt}</p>
      <button onClick={() => deletePostHandler(data.id)}>Delete</button>
    </div>
  );
};

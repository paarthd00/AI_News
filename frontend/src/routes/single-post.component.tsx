import { createFileRoute } from "@tanstack/react-router";
import { singlePostSearchSchema } from "@/lib/validation";
import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute("/single-post")({
  validateSearch: singlePostSearchSchema,
});


export const component = function SinglePost() {
  const {
    id
  } = Route.useSearch();

  const { isPending, error, data } = useQuery({
    queryKey: ["singlePost", id],
    queryFn: async ({ queryKey }) => {
      const [_, id] = queryKey;
      const result = await fetch(`/api/posts/${id}`);
      return await result.json();
    },
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <div className="container">
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p>{data.authorName}</p>
    </div>
  );
};

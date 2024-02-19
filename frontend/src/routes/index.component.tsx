import { getPosts, deletePost, Post } from "@/network";
import { queryClient } from "@/main";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export const component = function Home() {
  // Make sure to keep the query and mutation before any return statement 
  const { isPending, error, data } = useQuery({
    queryKey: ['postData'],
    queryFn: getPosts
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSettled: () => queryClient.invalidateQueries({ "queryKey": ["postData"] })
  });

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Something went wrong</div>

  return (
    <div className="py-10 container">
      {data?.map((post: Post) => (
        <div key={post.id}>
          <h2 className="text-2xl">{post.title}</h2>
          <p>Rating: {post.content}</p>
          <p>Created At: {post.createdAt}</p>

          <div className="flex gap-2">
            <button
              onClick={() => { deletePostMutation.mutate(post.id) }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

            <Link
              to="/edit"
              search={{
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

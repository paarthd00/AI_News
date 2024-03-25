import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { singlePostSearchSchema } from "@/lib/validation";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { Post, deletePost } from "@/network";
import AddForm from "@/components/add-form";
import { useContext } from "react";
import { CurrentUserContext } from "@/context/index";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/single-post")({
  validateSearch: singlePostSearchSchema,
});

export const component = function SinglePost() {
  const { id } = Route.useSearch();
  const Navigate = useNavigate();
  const [currentUser, _] = useContext(CurrentUserContext);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState([]);

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

  useEffect(() => {
    (async()=>{
      const result = await fetch(`/api/AIPosts/comments/${data?.id}`);
      const jsonResult = await result.json();
      setComments(jsonResult);
    })();
  }, [data?.id]);

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <div className="container py-5">

      <div className="mb-5">
        <h1 className="text-3xl">{data.title}</h1>
        <p>{data.content}</p>
        <p>{data.authorName}</p>
        <p>{data.createdAt}</p>
        {
          currentUser?.id === data.userId &&
            <button onClick={() => deletePostHandler(data.id)}>Delete</button>
        }
      </div>
      {
        comments.map((comment: Post) => (
          <div key={comment.id} className="mb-6 ms-5">
            <h1 className="text-xl">{comment.title}</h1>
            <p>{comment.user.userName}</p>
            <p>{comment.createdAt}</p>
          </div>
        ))
      }
      <button className="btn bg-[#f0f0f0] px-2 py-2 mb-5" onClick={() => setShowCommentForm(!showCommentForm)}>Add comment</button>
      {showCommentForm && <AddForm parentId={id} />}

    </div>
  );
};

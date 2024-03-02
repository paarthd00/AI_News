import { Link } from "@tanstack/react-router";
import { Post } from "@/network";
import { calculateTimeDifference } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { updatePost } from "@/network";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
export default function PostListing(
  { posts }: { posts: Post[] }
) {
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["postData"] }),
  });

  const { user } = useKindeAuth();

  const updatePostHandler = (post: Post) => {
    
    const newPost: Post = {
      id: post.id,
      title: post.title,
      content: post.content,
      url: post.url,
      userId: post.userId,
      createdAt: post.createdAt,
    };

    try {
      updatePostMutation.mutate({
        id: post.id,
        newPost,
      });
    } catch (error) {
      alert("Error updating post");
    }
  };

  return (
    <div>
      <div className=" !px-0 container">
        {posts.map((post: Post, i: number) => {
          return (
            <div className="flex flex-col bg-[#F6F6EF] p-3 " key={post.id}>
              <div className="flex gap-2 items-center">
                <p>{i + 1}.</p>
                {
                  user?.id !== post.authorId &&
                  <button onClick={() => updatePostHandler(post)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 32 16"
                      width="32"
                    >
                      <path d="m2 27 14-29 14 29z" fill="#999" />
                    </svg>
                  </button>
                }
                {
                  post.url ? (
                    <a href={post.url} target="_blank" rel="noreferrer">
                      <h2 className="text-md">{post.title}</h2>
                    </a>
                  ) : (
                    <Link
                      to="/single-post"
                      search={{
                        id: post.id,
                      }}
                    >
                      <h2 className="text-md">{post.title}</h2>
                    </Link>
                  )
                }
                {
                  user?.id === post.authorId &&
                  <Link
                    to="/single-post"
                    search={{
                      id: post.id,
                    }}
                  >
                    details
                  </Link>
                }
              </div>
              <div className="flex ps-2">
                <p className="text-[#828282]">
                  {calculateTimeDifference(post.createdAt)} hours ago by{" "}
                  {post.authorName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

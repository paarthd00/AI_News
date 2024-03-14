import { Link } from "@tanstack/react-router";
import { Post } from "@/network";
import { calculateTimeDifference } from "@/lib/utils";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function PostListing(
  { posts }: { posts: Post[] }
) {

  const { user } = useKindeAuth();

  const userId = user?.id;
  console.log("id: ", userId);

  const { isPending, error, data } = useQuery({
    queryKey: ["currentUser", userId],
    queryFn: async ({ queryKey }) => {
      const [_, id] = queryKey;
      const result = await fetch(`/api/users/${userId}`);
      return await result.json();
    },
  });

  useEffect(() => {
    console.log("posts", posts);
  }, []);

  const updateVote = async ({
    postId, userId
  }:
    {
      postId: string;
      userId: string;
    }
  ) => {

    try {
      const resp = await fetch(`/api/AIPosts/vote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "UserId": userId,
          "PostId": postId
        }),
      });

      return resp;
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
                  user?.id !== post.userId &&
                  <button onClick={() => updateVote({
                    postId: post.id,
                    userId: data.id
                  })}>
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
                  user?.id === post.userId &&
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
                  {post.user.userName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

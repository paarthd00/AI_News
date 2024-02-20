import { getPosts, Post } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import useSignalR from "../use-signalR";
export const component = function Home() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["postData"],
    queryFn: getPosts,
  });

  const { connection } = useSignalR("/r/postHub");

  useEffect(() => {
    if (!connection) {
      return;
    }
    // listen for messages from the server
    connection.on("newpost", () => {
      refetch();
    });

    return () => {
      connection.off("newpost");
    };
  }, [connection]);

  const { isAuthenticated, isLoading, login } = useKindeAuth();

  useEffect(() => {
    if (isAuthenticated)  {
      refetch();
   }
  }, [isAuthenticated]);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <>
      {isAuthenticated? (
        <div>
          <div className="py-10 container">
            {data?.map((post: Post) => {
              return (
                <div key={post.id}>
                  <h2 className="text-md">{post.title}</h2>
                  <p>{post.createdAt}</p>
                  <p>
                    {post.upVotes} points by {post.authorName}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <>
          <p>Please sign in or register!</p>
          <button onClick={() => login()} type="button">
            Sign In
          </button>
        </>
      )}
    </>
  );
};

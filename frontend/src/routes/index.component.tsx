import { getPosts, Post } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import useSignalR from "../use-signalR";

import { Link } from "@tanstack/react-router";
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
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;
  function calculateTimeDifference(referenceTimeString: string) {
    const referenceTime = new Date(referenceTimeString);
    const now = new Date();
    //@ts-ignore
    const timeDiff = now - referenceTime; // Difference in milliseconds
    const hours = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours

    return Math.floor(hours);
  }

  return (
    <>
      {isAuthenticated ? (
        <div>
          <div className="py-10 container">
            {data?.map((post: Post, i: number) => {
              return (
                <div className="flex flex-col bg-[#F6F6EF] p-3 " key={post.id}>
                  <div className="flex gap-2 items-center">
                    <p>{i + 1}.</p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 32 16" width="32"><path d="m2 27 14-29 14 29z" fill="#999" /></svg>
                    <Link
                      to="/single-post"
                      search={{
                        id: post.id,
                      }}
                    >
                      <h2 className="text-md">{post.title}</h2>
                    </Link>
                  </div>
                  <div className="flex ps-2">
                    <p className="text-[#828282]" >{post.upVotes} points {calculateTimeDifference(post.createdAt)} hours ago   by {post.authorName}</p>
                  </div>
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

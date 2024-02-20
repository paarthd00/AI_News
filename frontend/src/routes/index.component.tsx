import { getPosts } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import useSignalR from "../use-signalR";

import PostListing from "@/components/post-listing";
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


  return (
    <>
      {isAuthenticated ? (
        <PostListing posts={data} />
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

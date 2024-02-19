import { getPosts, Post } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";
export const component = function Home() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["postData"],
    queryFn: getPosts,
  });

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("/api/posthub")
      .build();

    setConnection(newConnection);

    setLoggedIn(localStorage.getItem("isAuthenticated") === "true");

  }, []); // Initialize connection once 

  useEffect(() => {
    console.log("SignalR Connected");
    if (connection) {
      connection.start()
        .then(() => {

          connection.on("newPost", (newPost) => {
            console.log("newPost", newPost);
            // TanStack Query: Optimistically update the cache
            refetch(); // Triggers a refetch
          });
        })
        .catch(err => console.error(err));
    }
  }, [connection]); // Connect when the connection object is ready

  const [loggedIn, setLoggedIn] = useState(false);
  const { isAuthenticated, isLoading, login } = useKindeAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
      // set cookies for the user so on refresh they are still authenticated
      localStorage.setItem("isAuthenticated", "true");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <>
      {loggedIn ? (
        <div>
          <div className="py-10 container">
            {data?.map((post: Post) => (
              <div key={post.id}>
                <h2 className="text-md">{post.title}</h2>
                <p>{post.createdAt}</p>
                <p>
                  {post.upVotes} points by {post.authorId}
                </p>
              </div>
            ))}
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

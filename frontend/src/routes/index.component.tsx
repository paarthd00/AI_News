import { getPosts, Post } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
export const component = function Home() {
  const { isAuthenticated, isLoading, login } = useKindeAuth();
  const { isPending, error, data } = useQuery({
    queryKey: ["postData"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <>
      {isAuthenticated ? (
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

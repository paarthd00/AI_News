import { useQuery } from "@tanstack/react-query";
import { allComments } from "@/network";
export const component = function New() {
  const { isPending, error, data } = useQuery({
    queryKey: ["commentData"],
    queryFn: allComments,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;


  return <div className="py-10 container">
    <h1>Comments</h1>
    <div className="grid grid-cols-1 gap-4">
      {data.map((comment: any, i: number) => {
        return (
          <div key={i} className="bg-white p-4 rounded-md shadow-md">
            <p>{comment.content}</p>
            <p>{comment.authorName}</p>
            <p>{comment.createdAt}</p>
          </div>
        );
      })}
    </div>

  </div>;
};

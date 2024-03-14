import { Input } from "@/components/ui/input";
import { getPosts } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const component = function Threads() {
  const [threadSearch, setThreadSearch] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["postsData"],
    queryFn: getPosts,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return <div className="py-10 container flex flex-col items-center gap-4 justify-center bg-[#F6F6EF]">
    <div className=" flex gap-2 items-center">
      <p>Search : </p>
      <Input
        onChange={(e) => setThreadSearch(e.target.value)}
        className="w-[15rem]"
        placeholder="Search threads"
      />
    </div>

    {
      threadSearch !== "" &&
      <div className="grid grid-cols-1 gap-4">
        {data.map((post: any, i: number) => {
          if (!post.title.toLowerCase().includes(threadSearch.toLowerCase()) && !post.content.toLowerCase().includes(threadSearch.toLowerCase())) {
            return null;
          }
          return (
            <div key={i} className="bg-white p-4 rounded-md shadow-md">
              <p>{post.title}</p>
              <p>{post.content}</p>
              <p>{post.authorName}</p>
              <p>{post.createdAt}</p>
            </div>
          );
        })
        }
      </div>
    }
  </div>;
};

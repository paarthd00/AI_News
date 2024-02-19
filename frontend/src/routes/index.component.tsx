import { deleteMilk, Milk, getMilks } from "@/network";
import { queryClient } from "@/main";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export const component = function Home() {
  // Make sure to keep the query and mutation before any return statement 
  const { isPending, error, data } = useQuery({
    queryKey: ['milkData'],
    queryFn: getMilks
  })

  const deleteMilkMutation = useMutation({
    mutationFn: deleteMilk,
    onSettled: () => queryClient.invalidateQueries({ "queryKey": ["milkData"] })
  });

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Something went wrong</div>

  return (
    <div className="py-10 container">
      {data?.map((milk: Milk) => (
        <div key={milk.id}>
          <h2 className="text-2xl">{milk.type}</h2>
          <p>Rating: {milk.rating}</p>
          <p>Created At: {milk.createdAt}</p>

          <div className="flex gap-2">
            <button
              onClick={() => { deleteMilkMutation.mutate(milk.id) }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

            <Link
              to="/edit"
              search={{
                id: milk.id,
                type: milk.type,
                rating: milk.rating,
                createdAt: milk.createdAt,
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

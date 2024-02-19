import { getPosts } from "@/network";
import { useQuery } from "@tanstack/react-query";

export const component = function New() {
    // Make sure to keep the query and mutation before any return statement 
    const { isPending, error, data } = useQuery({
        queryKey: ['postData'],
        queryFn: getPosts
    })

    if (isPending) return <div>Loading...</div>

    if (error) return <div>Something went wrong</div>

    return (
        <div className="py-10 container">
            Comments
        </div>
    )
}

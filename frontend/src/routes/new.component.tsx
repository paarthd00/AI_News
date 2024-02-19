import { deleteMilk, Milk, getMilks } from "@/network";
import { queryClient } from "@/main";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export const component = function New() {
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
            New
        </div>
    )
}

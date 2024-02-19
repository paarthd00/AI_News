import EditForm from "@/components/edit-form"
import { editSearchSchema } from "@/lib/validation"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/edit')({
    validateSearch: editSearchSchema
})

export const component = function Edit() {

    const { id, type, rating, createdAt } = Route.useSearch()

    return (
        <div className="container">
            <EditForm
                milkId={id}
                milkType={type}
                milkRating={rating}
                createdAt={createdAt}
            />
        </div>
    )
}

import EditForm from "@/components/edit-form"
import { editSearchSchema } from "@/lib/validation"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/edit')({
    validateSearch: editSearchSchema
})

export const component = function Edit() {

    const { id, title, content, createdAt } = Route.useSearch()

    return (
        <div className="container">
            <EditForm
                postId={id}
                title={title}
                content={content}
                createdAt={createdAt}
            />
        </div>
    )
}

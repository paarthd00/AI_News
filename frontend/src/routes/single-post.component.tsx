import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/single-post')({
    component: () => <div>Hello /single-post!</div>
})
import { Link } from "@tanstack/react-router"
import { Post } from "@/network"
import { calculateTimeDifference } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/main"
import { updatePost } from "@/network"

export default function PostListing(
    posts: any
) {
    console.log(posts.posts)

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["postData"] }),
    });

    const updatePostHandler = (post: Post) => {

        const newPost: Post = {
            id: post.id,
            title: post.title,
            content: post.content,
            upVotes: post.upVotes + 1,
            downVotes: post.downVotes,
            authorId: post.authorId,
            authorName: post.authorName,
            createdAt: post.createdAt,
        };

        try {
            updatePostMutation.mutate({
                id: post.id,
                newPost
            });
        } catch (error) {
            alert("Error updating post");
        } finally {
        }
    }

    return (
        <div>
            <div className="py-10 container">
                {posts.posts?.map((post: Post, i: number) => {
                    return (
                        <div className="flex flex-col bg-[#F6F6EF] p-3 " key={post.id}>
                            <div className="flex gap-2 items-center">
                                <p>{i + 1}.</p>
                                <button onClick={() => updatePostHandler(post)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 32 16" width="32"><path d="m2 27 14-29 14 29z" fill="#999" /></svg>
                                </button>
                                <Link
                                    to="/single-post"
                                    search={{
                                        id: post.id,
                                    }}
                                >
                                    <h2 className="text-md">{post.title}</h2>
                                </Link>
                            </div>
                            <div className="flex ps-2">
                                <p className="text-[#828282]" >{post.upVotes} points {calculateTimeDifference(post.createdAt)} hours ago   by {post.authorName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
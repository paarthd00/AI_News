export type Post = {
  id: number;
  title: string;
  content: string;
  upVotes?: number;
  downVotes?: number;
  createdAt: string;
};

export async function getPosts() {
  const result = await fetch("/api/Posts");
  return await result.json();
}

export async function deletePost(id: number) {
  await fetch(`/api/Posts/${id}`, { method: "DELETE" });
}

export async function createPost({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const milk = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  }).then((response) => response.json());
  return milk;
}

export async function updatePost({
  id,
  newPost,
}: {
  id: number;
  newPost: Post;
}) {
  console.log("updateMilk", id, newPost);
  let resp = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  return resp;
}

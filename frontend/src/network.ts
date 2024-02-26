export type Post = {
  id: number;
  title: string;
  content: string;
  url: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

export async function getPosts() {
  const result = await fetch("/api/AIPosts");
  return await result.json();
}

export async function deletePost(id: number) {
  await fetch(`/api/AIPosts/${id}`, { method: "DELETE" });
}

export async function createPost({
  title,
  content,
  url,
  authorId,
  authorName,
}: {
  title: string;
  content: string;
  url: string;
  authorId: string;
  authorName: string;
}) {
  const newsPostResponse = await fetch("/api/AIPosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, url, authorId, authorName }),
  }).then((response) => response.json());
  return newsPostResponse;
}

export async function updatePost({
  id,
  newPost,
}: {
  id: number;
  newPost: Post;
}) {
  const resp = await fetch(`/api/AIPosts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  return resp;
}

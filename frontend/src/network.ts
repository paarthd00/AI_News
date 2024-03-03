export type User = {
  id: string;
  userId: string;
  userName: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  url: string;
  userId: string;
  user: User;
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
  userId,
}: {
  title: string;
  content: string;
  url: string;
  userId: string;
}) {
  const newsPostResponse = await fetch("/api/AIPosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, url, userId }),
  }).then((response) => response.json());
  return newsPostResponse;
}

export async function upDownVotePost({
  id,
  vote,
}: {
  id: string;
  vote: "up" | "down";
}) {
  const resp = await fetch(`/api/AIPosts/vote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vote }),
  });

  return resp;
}

export async function updatePost({
  id,
  newPost,
}: {
  id: string;
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

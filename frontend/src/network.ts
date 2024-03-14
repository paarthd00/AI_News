export type User = {
  id: string;
  userId: string;
  userName: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  likes: number;
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
  parentId,
}: {
  title: string;
  content: string;
  url: string;
  userId: string;
  parentId?: string | undefined;
}) {
  const newsPostResponse = await fetch("/api/AIPosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, url, userId, parentId }),
  }).then((response) => response.json());
  return newsPostResponse;
}

export async function getUserById(userId: string) {
  const result = await fetch(`/api/AIPosts/users/${userId}`);
  return await result.json();
}

export async function upDownVotePost({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const resp = await fetch(`/api/AIPosts/vote/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, postId }),
  });

  return resp;
}

export async function updatePost({
  postId,
  newPost,
}: {
  postId: string;
  newPost: Post;
}) {
  const resp = await fetch(`/api/AIPosts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  return resp;
}

export async function allComments() {
  const result = await fetch("/api/AIPosts/comments");
  return await result.json();
}

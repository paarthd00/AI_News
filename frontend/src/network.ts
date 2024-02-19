export type Milk = {
  id: number;
  type: string;
  rating: number;
  createdAt: string;
};

export async function getMilks() {
  const result = await fetch("/api/Milks");
  return await result.json();
}

export async function deleteMilk(id: number) {
  await fetch(`/api/Milks/${id}`, { method: "DELETE" });
}

export async function createMilk({
  type,
  rating,
}: {
  type: string;
  rating: number;
}) {
  const milk = await fetch("/api/milks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, rating }),
  }).then((response) => response.json());
  return milk;
}

export async function updateMilk({
  id,
  newMilk,
}: {
  id: number;
  newMilk: Milk;
}) {
  console.log("updateMilk", id, newMilk);
  let resp = await fetch(`/api/milks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMilk),
  });

  return resp;
}

// /api/Milks/ByRating?starRating=3
export default async function getMilkByRating(rating: number) {
  const result = await fetch(`/api/Milks/ByRating?starRating=${rating}`, {
    method: "GET",
  });
  return await result.json();
}

import { api } from "@/lib/axios";

export async function createReview(data: {
  collegeId: string;
  comment: string;
  rating: number;
}) {
  const result = await api.post(
    "/reviews",
    data
  );

  return result.data;
}
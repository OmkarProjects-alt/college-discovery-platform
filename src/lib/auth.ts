import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload =
      verifyToken(token) as {
        userId: string;
      };

    const user =
      await prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

    if (!user) {
      return null;
    }

    return user;

  } catch {
    return null;
  }
}
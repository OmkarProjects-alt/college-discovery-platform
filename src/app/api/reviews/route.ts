import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to review",
        },
        { status: 401 }
      );
    }

    const { collegeId, comment, rating } =
      await req.json();

    if (
      !collegeId ||
      !comment ||
      !rating
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const existingReview =
      await prisma.review.findFirst({
        where: {
          userId: currentUser.id,
          collegeId,
        },
      });

    if (existingReview) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You have already reviewed this college",
        },
        { status: 400 }
      );
    }

    const review =
      await prisma.review.create({
        data: {
          userId: currentUser.id,
          comment,
          rating: Number(rating),
          collegeId,
        },
      });

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
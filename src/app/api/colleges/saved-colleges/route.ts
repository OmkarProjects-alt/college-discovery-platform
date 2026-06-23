import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";


export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const saved = await prisma.savedCollege.findMany({
      where: {
        userId: user.id,
      },
      include: {
        college: true,
      },
    });

    return NextResponse.json({
      success: true,
      saved,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { collegeId } = await req.json();

    if (!collegeId) {
      return NextResponse.json(
        { success: false, message: "College ID required" },
        { status: 400 }
      );
    }

    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: user.id,
          collegeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        message: "Already saved",
      });
    }

    await prisma.savedCollege.create({
      data: {
        userId: user.id,
        collegeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "College saved",
    });
  } catch (error: any) {

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { collegeId } = await req.json();

    if (!collegeId) {
      return NextResponse.json(
        { success: false, message: "College ID required" },
        { status: 400 }
      );
    }

    await prisma.savedCollege.deleteMany({
      where: {
        userId: user.id,
        collegeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Removed",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
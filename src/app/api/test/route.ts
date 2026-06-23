import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const colleges = await prisma.college.update({
      where: {
        id: "cmqp5c9c70005uoxchp505ulz",
      },

      data: {
        cutoffRank: 10000,
        naacGrade: "A+",
        instituteType: "Government",
        link: "https://www.iitb.ac.in"
      },

    });


    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
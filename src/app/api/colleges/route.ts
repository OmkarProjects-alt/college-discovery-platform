import { NextRequest, NextResponse } from "next/server";
import { getColleges } from "@/services/college.service";

export async function GET(req: NextRequest) {
    try {

        const page = Number(req.nextUrl.searchParams.get("page") || "1");

        const colleges = await getColleges({
            location: req.nextUrl.searchParams.get("location") ?? undefined,
            search: req.nextUrl.searchParams.get("search") ?? undefined,
            rating: req.nextUrl.searchParams.get("rating") ?? undefined,
            fees: req.nextUrl.searchParams.get("fees") ?? undefined,
        }, page, 6 );

        return NextResponse.json(colleges);
    } catch (error) {
        return NextResponse.json(
            { message: "failed to fetch colleges" },
            { status: 500 },
        );
    }
}



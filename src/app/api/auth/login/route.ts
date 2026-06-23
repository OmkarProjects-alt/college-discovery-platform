import { prisma } from "@/lib/prisma";
import { generateToken } from '@/lib/jwt';
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, password } = await req.json();

   try {
         if(!email || !password) {
        return NextResponse.json(
            {
                success: false,
                message: "All fields are required",
            },
            {status: 400},
        );
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if(!user) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid Creadentials",
            },
            { status: 401 },
        )
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return NextResponse.json(
            {
                success: false,
                message: "Password did not match",
            },
            { status: 401 },
        )
    }

    const token = generateToken(user.id);

    const cookieStore = await cookies();

    cookieStore.set(
        "token", 
        token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
    });

    return NextResponse.json(
        {
            success: true,
            message:
            "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        },
    );
   } catch (error) {

        return NextResponse.json(
            {
                success: false,
                message:
                "Something went wrong",
            },
            { status: 500 }
        );
   }
}
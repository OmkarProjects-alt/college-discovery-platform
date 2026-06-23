import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try{
        const { name, email, password } = await req.json();

        if(!name || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required"
                },
                { status: 400 },
            )
        } 

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if(existingUser) {
            return NextResponse.json(
                {   
                    success: false,
                    message: "User already exist",
                },
                { status: 400 },
            )
        }


        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            }
        })

        return NextResponse.json(
            {
                success: true,
                message: "User created Successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
            },
            { status: 201 }
        );
    } catch(error) {

        return NextResponse.json(
            {
                success: false,
                message:
                "Something went wrong",
            },
            { status: 500 },
        );
    }
}
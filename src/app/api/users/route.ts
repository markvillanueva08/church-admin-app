import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { requireSuperUser } from "@/lib/requireSuperUser";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { forbidden } = await requireSuperUser();
  if (forbidden) return forbidden;

  try {
    const body = await request.json();
    const { name, email, password, role, dateOfBirth } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const dob = dateOfBirth ? new Date(dateOfBirth) : null;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        dateOfBirth: dob,
      }
    });

    return NextResponse.json({ message: "User created", user: { id: user.id, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceEventId, userId, teamName, position } = body;

    const schedule = await prisma.schedule.create({
      data: {
        serviceEventId,
        userId,
        teamName,
        position
      }
    });

    return NextResponse.json({ message: "Schedule created", schedule }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

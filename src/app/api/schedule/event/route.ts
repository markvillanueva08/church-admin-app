import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireSuperUser } from "@/lib/requireSuperUser";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { forbidden } = await requireSuperUser();
  if (forbidden) return forbidden;

  try {
    const body = await request.json();
    const { title, date, location, timeSlot, description } = body;

    const event = await prisma.serviceEvent.create({
      data: {
        title,
        date: new Date(date),
        location,
        timeSlot,
        description
      }
    });

    return NextResponse.json({ message: "Event created", event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

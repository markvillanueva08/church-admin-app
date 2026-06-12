import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireSuperUser } from "@/lib/requireSuperUser";

const prisma = new PrismaClient();

// PUT /api/schedule/event/[id] — Update an event
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { forbidden } = await requireSuperUser();
  if (forbidden) return forbidden;

  const { id } = await params;

  try {
    const body = await request.json();
    const { title, date, location, timeSlot, description } = body;

    const updated = await prisma.serviceEvent.update({
      where: { id },
      data: {
        title,
        date: new Date(date),
        location,
        timeSlot,
        description,
      },
    });

    return NextResponse.json({ message: "Event updated", event: updated });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/schedule/event/[id] — Delete an event and its schedules
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { forbidden } = await requireSuperUser();
  if (forbidden) return forbidden;

  const { id } = await params;

  try {
    // Delete volunteer assignments first (foreign key constraint)
    await prisma.schedule.deleteMany({ where: { serviceEventId: id } });
    await prisma.serviceEvent.delete({ where: { id } });

    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

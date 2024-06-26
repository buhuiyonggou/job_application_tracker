import authOptions from "@/app/auth/authOptions";
import { updateApplicationSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const application = await prisma.application.findUnique({
      where: {
        application_id: parseInt(params.id),
        assignedToUserId: session.user.id,
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Invalid application" }, { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = updateApplicationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const application = await prisma.application.findUnique({
      where: {
        application_id: parseInt(params.id),
        assignedToUserId: session.user.id,
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Invalid application" }, { status: 404 });
    }

    const updateApplication = await prisma.application.update({
      where: {
        application_id: application.application_id,
      },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updateApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const application = await prisma.application.findUnique({
      where: {
        application_id: parseInt(params.id),
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Invalid application' }, { status: 404 });
    }

    await prisma.application.delete({
      where: {
        application_id: application.application_id,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}

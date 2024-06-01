import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const data = await req.json();
    console.log("Received data, api:", data); // Debug log

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        updatedAt: new Date(), // Update the updated time
      },
    });
    console.log("Updated user, api:", updatedUser); // Debug log
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        gender: data.gender,
        description: data.description,
        linkedin: data.linkedin,
        personal_site: data.personal_site,
        image: data.image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
import authOptions from "@/app/auth/authOptions";
import { applicationSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();

  const validation = applicationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

const newApplication = await prisma.application.create({
    data: {
            company: body.company,
            category: body.category,
            job_title: body.job_title,
            job_info: body.job_info,
            track_link: body?.track_link,
            position_code: body.position_code,
            type: body.type,
            term: body.term,
            year: body.year,
            location: body.location,
    },
});

  return NextResponse.json(newApplication, { status: 201 });
}

export async function GET(
  request: NextRequest,
) {
  const application = await prisma.application.findMany({
  });

  if (!application) {
    return NextResponse.json({ error: "Invalid application" }, { status: 404 });
  }

  return NextResponse.json(application);
}
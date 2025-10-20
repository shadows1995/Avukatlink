import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const where: any = { status: "PENDING" };
  if (city) where.city = { contains: city, mode: "insensitive" };
  const tasks = await prisma.task.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      deadline: true,
      offeredFee: true,
      city: true,
      status: true,
      creator: { select: { id: true, fullName: true, city: true } },
    },
  });
  return NextResponse.json({ tasks });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ message: "Yetkisiz" }, { status: 401 });

  const body = await req.json();
  const { title, description, location, deadline, offeredFee, city } = body;
  if (!title || !description || !location || !deadline || !offeredFee || !city) {
    return NextResponse.json({ message: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const creator = await prisma.lawyer.findUnique({ where: { email: session.user.email } });
  if (!creator) return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });

  const task = await prisma.task.create({
    data: {
      title,
      description,
      location,
      deadline: new Date(deadline),
      offeredFee: Number(offeredFee),
      city,
      creatorId: creator.id,
    },
    select: { id: true },
  });
  return NextResponse.json({ task }, { status: 201 });
}



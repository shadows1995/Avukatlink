import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const barAssociation = searchParams.get("bar") || undefined;
  const q = searchParams.get("q") || undefined;
  // specialties is ignored in server filtering for SQLite JSON. Can be filtered client-side if needed.

  const where: any = {};
  if (city) where.city = { contains: city, mode: "insensitive" };
  if (barAssociation) where.barAssociation = { contains: barAssociation, mode: "insensitive" };
  if (q) where.fullName = { contains: q, mode: "insensitive" };

  const lawyers = await prisma.lawyer.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      barAssociation: true,
      city: true,
      languages: true,
      specialties: true,
      rating: true,
      photoUrl: true,
      verified: true,
    },
    take: 50,
  });

  return NextResponse.json({ lawyers });
}



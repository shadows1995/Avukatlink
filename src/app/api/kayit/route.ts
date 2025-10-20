import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      barAssociation,
      city,
      languages,
      specialties,
      password,
    } = body;

    if (!fullName || !email || !password || !city || !barAssociation) {
      return NextResponse.json({ message: "Zorunlu alanlar eksik." }, { status: 400 });
    }

    const existing = await prisma.lawyer.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Bu e-posta zaten kayıtlı." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.lawyer.create({
      data: {
        fullName,
        email,
        phone: phone ?? "",
        barAssociation,
        city,
        languages: Array.isArray(languages) ? languages : [],
        specialties: Array.isArray(specialties) ? specialties : [],
        passwordHash,
      },
      select: { id: true, fullName: true, email: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Sunucu hatası." }, { status: 500 });
  }
}



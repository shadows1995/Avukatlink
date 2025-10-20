import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function LawyerPage({ params }: { params: { id: string } }) {
  const lawyer = await prisma.lawyer.findUnique({
    where: { id: params.id },
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
  });
  if (!lawyer) return notFound();
  const languages = Array.isArray(lawyer.languages) ? (lawyer.languages as string[]) : [];
  const specialties = Array.isArray(lawyer.specialties) ? (lawyer.specialties as string[]) : [];

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gray-200" />
        <div>
          <h1 className="text-2xl font-semibold">{lawyer.fullName}</h1>
          <p className="text-sm text-muted-foreground">
            {lawyer.city} · {lawyer.barAssociation}
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <h2 className="font-medium">Uzmanlıklar</h2>
          <p className="text-sm text-muted-foreground">{specialties.join(", ") || "—"}</p>
        </div>
        <div>
          <h2 className="font-medium">Diller</h2>
          <p className="text-sm text-muted-foreground">{languages.join(", ") || "—"}</p>
        </div>
      </div>
      <div className="mt-6">
        <a href={`mailto:${lawyer.email}`} className="text-[#0b1b34] underline">
          E-posta ile İletişim
        </a>
      </div>
    </div>
  );
}



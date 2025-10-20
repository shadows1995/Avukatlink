import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admins = (process.env.ADMIN_EMAILS || "").split(",").map((s) => s.trim()).filter(Boolean);
  // In a real app, check session and gate; here we just show pending verifications list
  const pending = await prisma.lawyer.findMany({ where: { verified: false }, select: { id: true, fullName: true, email: true } });

  async function verify(id: string) {
    "use server";
    await prisma.lawyer.update({ where: { id }, data: { verified: true } });
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Yönetici Paneli</h1>
      <p className="text-sm text-muted-foreground">Bekleyen doğrulamalar</p>
      <div className="mt-4 space-y-2">
        {pending.map((u) => (
          <form key={u.id} action={verify.bind(null, u.id)} className="flex items-center justify-between rounded border p-3">
            <div>
              <div className="font-medium">{u.fullName}</div>
              <div className="text-sm text-muted-foreground">{u.email}</div>
            </div>
            <button className="rounded bg-[#0b1b34] px-3 py-1 text-white">Doğrula</button>
          </form>
        ))}
      </div>
    </div>
  );
}



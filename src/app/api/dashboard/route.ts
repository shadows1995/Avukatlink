import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ message: "Yetkisiz" }, { status: 401 });

  const me = await prisma.lawyer.findUnique({ where: { email: session.user.email } });
  if (!me) return NextResponse.json({ message: "Kullanıcı yok" }, { status: 404 });

  const [myTasks, acceptedTasks] = await Promise.all([
    prisma.task.findMany({
      where: { creatorId: me.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.task.findMany({
      where: { acceptorId: me.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalEarned = acceptedTasks
    .filter((t) => t.status === "COMPLETED")
    .reduce((sum, t) => sum + (t.offeredFee || 0), 0);
  const pendingPayments = acceptedTasks
    .filter((t) => t.status !== "COMPLETED")
    .reduce((sum, t) => sum + (t.offeredFee || 0), 0);

  return NextResponse.json({ myTasks, acceptedTasks, summary: { totalEarned, pendingPayments } });
}



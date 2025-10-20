"use client";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  status: string;
  offeredFee: number;
};

export default function PanelPage() {
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [acceptedTasks, setAcceptedTasks] = useState<Task[]>([]);
  const [summary, setSummary] = useState({ totalEarned: 0, pendingPayments: 0 });

  const load = async () => {
    const res = await fetch("/api/dashboard");
    if (!res.ok) return;
    const json = await res.json();
    setMyTasks(json.myTasks ?? []);
    setAcceptedTasks(json.acceptedTasks ?? []);
    setSummary(json.summary ?? { totalEarned: 0, pendingPayments: 0 });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Kontrol Paneli</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded border p-4">
          <div className="text-sm text-muted-foreground">Toplam Kazanç</div>
          <div className="text-2xl font-semibold">{summary.totalEarned} TL</div>
        </div>
        <div className="rounded border p-4">
          <div className="text-sm text-muted-foreground">Bekleyen Ödeme</div>
          <div className="text-2xl font-semibold">{summary.pendingPayments} TL</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-medium">Görevlerim</h2>
          <div className="space-y-2">
            {myTasks.map((t) => (
              <div key={t.id} className="rounded border p-3">
                <div className="flex items-center justify-between">
                  <div>{t.title}</div>
                  <div className="text-sm text-muted-foreground">{t.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-medium">Kabul Ettiklerim</h2>
          <div className="space-y-2">
            {acceptedTasks.map((t) => (
              <div key={t.id} className="rounded border p-3">
                <div className="flex items-center justify-between">
                  <div>{t.title}</div>
                  <div className="text-sm text-muted-foreground">{t.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  title: string;
  description: string;
  location: string;
  deadline: string;
  offeredFee: number;
  city: string;
  status: string;
  creator: { id: string; fullName: string };
};

export default function GorevlerPage() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    deadline: "",
    offeredFee: "",
    city: "",
  });

  const fetchTasks = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    const res = await fetch(`/api/tasks?${params.toString()}`);
    const json = await res.json();
    setTasks(json.tasks ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        offeredFee: Number(form.offeredFee),
      }),
    });
    if (res.ok) {
      setForm({ title: "", description: "", location: "", deadline: "", offeredFee: "", city: "" });
      fetchTasks();
    }
  };

  const acceptTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}/accept`, { method: "POST" });
    if (res.ok) fetchTasks();
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Görevler</h1>

      <div className="mb-6 rounded border p-4">
        <h2 className="font-medium mb-3">Görev Oluştur</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input placeholder="Başlık" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Şehir" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input placeholder="Konum" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input placeholder="Son Tarih (YYYY-MM-DD)" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
          <Input placeholder="Ücret (TL)" value={form.offeredFee} onChange={(e) => setForm({ ...form, offeredFee: e.target.value })} />
          <Input placeholder="Açıklama" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="mt-3">
          <Button onClick={createTask}>Oluştur</Button>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <Input placeholder="Şehir filtre" value={city} onChange={(e) => setCity(e.target.value)} className="max-w-xs" />
        <Button onClick={fetchTasks} disabled={loading}>{loading ? "Yükleniyor..." : "Filtrele"}</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((t) => (
          <div key={t.id} className="rounded border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-muted-foreground">
                  {t.city} · {t.location} · Son tarih: {new Date(t.deadline).toLocaleDateString("tr-TR")}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{t.offeredFee} TL</div>
                <Button onClick={() => acceptTask(t.id)} className="mt-2">Kabul Et</Button>
              </div>
            </div>
            <p className="mt-2 text-sm">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



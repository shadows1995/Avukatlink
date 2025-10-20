"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Lawyer = {
  id: string;
  fullName: string;
  barAssociation: string;
  city: string;
  languages: unknown;
  specialties: unknown;
  rating: number;
  photoUrl?: string | null;
  verified: boolean;
};

export default function AvukatBulPage() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [bar, setBar] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Lawyer[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    if (bar) params.set("bar", bar);
    const res = await fetch(`/api/lawyers?${params.toString()}`);
    const json = await res.json();
    setData(json.lawyers ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Avukat Bul</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Input placeholder="İsim ara" value={q} onChange={(e) => setQ(e.target.value)} />
        <Input placeholder="Şehir" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input placeholder="Baro" value={bar} onChange={(e) => setBar(e.target.value)} />
      </div>
      <div className="mt-3">
        <Button onClick={fetchData} disabled={loading}>{loading ? "Yükleniyor..." : "Ara"}</Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((l) => (
          <Link key={l.id} href={`/avukat/${l.id}`} className="rounded border p-4 hover:shadow">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div>
                <div className="font-medium">{l.fullName}</div>
                <div className="text-sm text-muted-foreground">
                  {l.city} · {l.barAssociation}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



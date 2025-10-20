"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  fullName: z.string().min(2, "Ad Soyad gerekli"),
  email: z.string().email("Geçerli bir e-posta giriniz"),
  phone: z.string().optional(),
  barAssociation: z.string().min(2, "Baro gerekli"),
  city: z.string().min(2, "Şehir gerekli"),
  password: z.string().min(6, "En az 6 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function KayitPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setOk(null);
    const res = await fetch("/api/kayit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, languages: [], specialties: [] }),
    });
    if (res.ok) setOk("Kayıt başarılı. Giriş yapabilirsiniz.");
    else setError("Kayıt başarısız. Bilgileri kontrol edin.");
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold mb-4">Kayıt Ol</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Ad Soyad</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">E-posta</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="barAssociation">Baro</Label>
          <Input id="barAssociation" {...register("barAssociation")} />
          {errors.barAssociation && (
            <p className="text-sm text-red-600 mt-1">{errors.barAssociation.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="city">Şehir</Label>
          <Input id="city" {...register("city")} />
          {errors.city && (
            <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Şifre</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {ok && <p className="text-sm text-green-600">{ok}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Kaydediliyor..." : "Kayıt Ol"}
        </Button>
      </form>
    </div>
  );
}



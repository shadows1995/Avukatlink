# AvukatLink

Türk avukatların bölgesel olarak iş birliği yapmasını ve hukuki görevleri devretmesini sağlayan bir platform.

## Özellikler (MVP)
- Avukat kaydı ve giriş (NextAuth Credentials)
- Avukat dizini: şehir/baro/isim filtreleri, profil sayfası
- Görev oluşturma, şehir bazlı listeleme, kabul etme
- Görev başına sohbet (basit polling)
- Kontrol paneli: Görevlerim, Kabul Ettiklerim, finans özeti
- Yönetici doğrulama paneli (demo)

## Kurulum
```bash
cp .env.example .env
# AUTH_SECRET için güçlü bir değer üretin
# PowerShell: [guid]::NewGuid().ToString("N")

npm install
npx prisma migrate dev --name init
npm run dev
```

Geliştirme: `http://localhost:3000`

## Gerekli Ortam Değişkenleri
- `DATABASE_URL` — SQLite için: `file:./dev.db`
- `AUTH_SECRET` — NextAuth için gizli anahtar
- `NEXTAUTH_URL` — Örn: `http://localhost:3000`
- `ADMIN_EMAILS` — Yönetici e-postaları (virgül ile ayrılmış)

## Mimari
- Next.js App Router + API Routes
- Prisma + SQLite (MVP için)
- TailwindCSS + shadcn/ui

## Dağıtım
- Frontend/SSR: Vercel
- Veritabanı: Geliştirme için SQLite; prod için PostgreSQL önerilir
  - PostgreSQL’e geçişte `prisma/schema.prisma` `datasource db.provider = "postgresql"`
  - `DATABASE_URL` güncelleyin ve `npx prisma migrate deploy`

## Yol Haritası
- WebSocket ile gerçek zamanlı sohbet
- Görev ödeme akışı ve faturalandırma
- Gelişmiş arama/filtre (uzmanlık/dil)
- E-posta doğrulama ve baro doğrulama entegrasyonları

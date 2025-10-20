"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/avukat-bul", label: "Avukat Bul" },
  { href: "/gorevler", label: "Görevler" },
  { href: "/panel", label: "Panel" },
  { href: "/giris", label: "Giriş Yap" },
  { href: "/kayit", label: "Kayıt Ol" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-[#0b1b34] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-wide">
          AvukatLink
        </Link>
        <nav className="flex gap-3 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded px-3 py-1 transition-colors",
                pathname === item.href ? "bg-[#c7a64b] text-[#0b1b34]" : "hover:bg-white/10"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}



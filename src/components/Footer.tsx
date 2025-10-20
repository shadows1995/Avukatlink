export function Footer() {
  return (
    <footer className="border-t bg-white text-[#0b1b34]">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
        <p className="text-[#0b1b34]">
          © {new Date().getFullYear()} AvukatLink — Bu site bir demo uygulamadır. Hukuki
          sorumluluk içermez.
        </p>
        <p className="mt-1 text-[#0b1b34]/70">İletişim: destek@avukatlink.com</p>
      </div>
    </footer>
  );
}



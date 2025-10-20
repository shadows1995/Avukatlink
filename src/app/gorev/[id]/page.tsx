"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GorevDetailPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<{ id: string; content: string; createdAt: string; sender: { fullName: string } }[]>([]);
  const [content, setContent] = useState("");

  const load = async () => {
    const res = await fetch(`/api/tasks/${params.id}/messages`);
    const json = await res.json();
    setMessages(json.messages ?? []);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, []);

  const send = async () => {
    if (!content.trim()) return;
    const res = await fetch(`/api/tasks/${params.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      setContent("");
      load();
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Görev Sohbeti</h1>
      <div className="rounded border p-4 h-[50vh] overflow-y-auto bg-white">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <div className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleTimeString("tr-TR")} · {m.sender.fullName}</div>
            <div>{m.content}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Mesaj yazın" />
        <Button onClick={send}>Gönder</Button>
      </div>
    </div>
  );
}



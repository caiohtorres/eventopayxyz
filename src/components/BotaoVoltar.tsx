"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BotaoVoltar() {
  const router = useRouter();

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Voltar
      </Button>
    </div>
  );
}

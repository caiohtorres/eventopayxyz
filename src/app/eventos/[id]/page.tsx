// src/app/eventos/[id]/page.tsx
import { Button } from "@/components/ui/button";
import { db } from "../../../lib/db"; // Ajuste o caminho conforme necessário
import Link from "next/link";

interface Evento {
  id: number;
  nome: string;
  data: Date;
  hora_inicio: Date;
  hora_fim: Date;
  local: string;
  capacidade: number;
}

const EventoPage = async ({ params }: { params: { id: string } }) => {
  const eventoId = parseInt(params.id);

  if (isNaN(eventoId)) {
    return <div>Evento não encontrado.</div>;
  }

  const evento = await db.evento.findUnique({
    where: { id: eventoId },
  });

  if (!evento) {
    return <div>Evento não encontrado.</div>;
  }

  return (
    <div className="h-screen flex-col items-center justify-center px-6 pt-24">
      <h2 className="text-3xl font-semibold text-center">{evento.nome}</h2>
      <div className="text-center items-center justify-center mt-10">
        {" "}
        <p>Local do Evento:{evento.local}</p>
        <p>Data e Hora do Evento: {evento.data.toString()}</p>
        <p>{evento.capacidade} lugares</p>
        <Link href={`/eventos/${evento.id}/participantes`}>
          <Button className="mt-10">Ver Participantes</Button>
        </Link>
      </div>

      {/* Link para a página de participantes */}
    </div>
  );
};

export default EventoPage;

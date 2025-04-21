import BotaoVoltar from "@/components/BotaoVoltar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Link from "next/link";

interface EventoPageProps {
  params: { id: string };
}

export default async function EventoPage({ params }: EventoPageProps) {
  const eventoId = parseInt(params.id);

  if (isNaN(eventoId)) {
    return <div className="p-4 text-center">ID do evento inválido</div>;
  }

  const evento = await db.evento.findUnique({
    where: { id: eventoId },
  });

  if (!evento) {
    return <div className="p-4 text-center">Evento não encontrado</div>;
  }

  return (
    <div className="h-screen flex-col items-center justify-center px-6 pt-24">
      <BotaoVoltar />
      <Card className="max-w-xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">{evento.nome}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p>
            <strong>Local:</strong> {evento.local}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {format(new Date(evento.data), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
          <p>
            <strong>Início:</strong>{" "}
            {evento.hora_inicio
              ? format(new Date(evento.hora_inicio), "HH:mm")
              : "Hora de início não disponível"}
          </p>
          <p>
            <strong>Fim:</strong>{" "}
            {evento.hora_fim
              ? format(new Date(evento.hora_fim), "HH:mm")
              : "Hora de fim não disponível"}
          </p>
          <p>
            <strong>Capacidade:</strong> {evento.capacidade} lugares
          </p>

          <div className="flex flex-col gap-3 pt-4">
            <Link href={`/eventos/${evento.id}/participantes`}>
              <Button className="w-full">Ver Participantes</Button>
            </Link>

            <Link href={`/eventos/${evento.id}/estatisticas`}>
              <Button className="w-full" variant="secondary">
                Ver Estatísticas do Evento
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

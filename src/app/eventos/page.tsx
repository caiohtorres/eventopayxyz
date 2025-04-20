import Link from "next/link";
import { db } from "../../lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import BotaoVoltar from "@/components/BotaoVoltar";

const EventosPage = async () => {
  const eventos = await db.evento.findMany();

  return (
    <div className="min-h-screen px-6 pt-24">
      <BotaoVoltar />
      <div className="mb-10 flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">Eventos Disponíveis</h2>
        <p className="text-muted-foreground">
          Clique em um evento para mais detalhes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {eventos.map((evento) => (
          <Link key={evento.id} href={`/eventos/${evento.id}`}>
            <Card className="transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
              <CardHeader>
                <CardTitle>{evento.nome}</CardTitle>
                <CardDescription>{evento.local}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Data:{" "}
                  {format(new Date(evento.data), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
                <p>
                  Horário:{" "}
                  {format(new Date(evento.hora_inicio), "HH:mm", {
                    locale: ptBR,
                  })}{" "}
                  -{" "}
                  {format(new Date(evento.hora_fim), "HH:mm", { locale: ptBR })}
                </p>
                <p>Capacidade: {evento.capacidade} pessoas</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventosPage;

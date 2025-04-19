// src/app/eventos/page.tsx
import Link from "next/link";
import { db } from "../../lib/db"; // Ajuste o caminho conforme necessário

interface Evento {
  id: number;
  nome: string;
  data: Date;
  hora_inicio: Date;
  hora_fim: Date;
  local: string;
  capacidade: number;
}

const EventosPage = async () => {
  const eventos = await db.evento.findMany(); // Buscar todos os eventos

  return (
    <div className="h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Título */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Eventos Disponíveis</h2>
      </div>

      {/* Lista de Eventos */}
      <div className="grid grid-cols-1 gap-6 pt-14 md:grid-cols-2 lg:grid-cols-2">
        {eventos.map((evento) => (
          <Link key={evento.id} href={`/eventos/${evento.id}`}>
            <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold">{evento.nome}</h3>
              <p className="text-sm text-gray-500">{evento.local}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventosPage;

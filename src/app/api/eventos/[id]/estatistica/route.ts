import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const eventoId = parseInt(params.id);

  if (isNaN(eventoId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const evento = await db.evento.findUnique({
    where: { id: eventoId },
    include: {
      participantes: true,
      checkins: true,
    },
  });

  if (!evento) {
    return NextResponse.json(
      { error: "Evento não encontrado" },
      { status: 404 }
    );
  }

  const totalParticipantes = evento.participantes.length;

  const checkinsPorParticipante = new Map<number, boolean>();
  evento.checkins.forEach((c) => {
    if (c.participanteId !== null) {
      checkinsPorParticipante.set(c.participanteId, true);
    }
  });
  
  const totalPendentes = evento.participantes.filter(
    (p) => !checkinsPorParticipante.has(p.id)
  ).length;
  
  const totalCheckins = evento.checkins.filter(
    (c) => c.hora_entrada !== null && c.status !== "ausente"
  ).length;  
  
  const totalCheckouts = evento.checkins.filter(
    (c) => c.hora_saida !== null
  ).length;
  

  return NextResponse.json({
    nome: evento.nome,
    capacidade: evento.capacidade,
    totalParticipantes,
    totalCheckins,
    totalCheckouts,
    totalPendentes,
  });
}

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { participanteId, eventoId } = body;

  if (!participanteId || !eventoId) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  try {
    const ultimoCheckin = await db.checkin.findFirst({
      where: { participanteId, eventoId },
      orderBy: { id: "desc" },
    });

    if (ultimoCheckin?.status === "ausente") {
      return NextResponse.json(
        { error: "Você não pode fazer check-in novamente após o checkout." },
        { status: 400 }
      );
    }

    let novoStatus = "presente";
    let hora_entrada = new Date();
    let hora_saida = null;

    if (ultimoCheckin?.status === "presente") {
      novoStatus = "ausente";
      hora_saida = new Date();
      hora_entrada = ultimoCheckin.hora_entrada ?? new Date();
    }

    const novoCheckin = await db.checkin.create({
      data: {
        participanteId,
        eventoId,
        status: novoStatus,
        hora_entrada,
        hora_saida,
      },
    });

    return NextResponse.json({
      id: novoCheckin.id,
      status: novoCheckin.status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar check-in" },
      { status: 500 }
    );
  }
}

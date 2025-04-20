import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  contextPromise: Promise<{ params: { id: string } }>
) {
  try {
    const { params } = await contextPromise;
    const eventoId = parseInt(params.id);

    if (isNaN(eventoId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const participantes = await db.participante.findMany({
      where: { eventoId },
      include: {
        checkins: {
          orderBy: { id: "desc" },
          take: 1,
        },
      },
    });

    const resultado = participantes.map((p) => ({
      id: p.id,
      nome: p.nome,
      email: p.email,
      telefone: p.telefone,
      checkin: p.checkins[0]
        ? {
            id: p.checkins[0].id,
            status: p.checkins[0].status ?? "pendente",
          }
        : {
            id: null,
            status: "pendente",
          },
    }));

    return NextResponse.json(resultado);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar participantes" },
      { status: 500 }
    );
  }
}

"use client";

import BotaoVoltar from "@/components/BotaoVoltar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ParticipanteComCheckin {
  id: number;
  nome: string;
  email: string | null;
  telefone: string | null;
  checkin: {
    id: number;
    status: string;
  } | null;
}

const ParticipantesPage = () => {
  const { id } = useParams();
  const [participantes, setParticipantes] = useState<ParticipanteComCheckin[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const res = await axios.get(`/api/eventos/${id}/participantes`);
        setParticipantes(res.data);
      } catch (error) {
        console.error("Erro ao carregar participantes:", error);
      }
    };

    fetchParticipantes();
  }, [id]);

  const toggleCheckin = async (participanteId: number) => {
    try {
      const res = await axios.post(`/api/checkin`, {
        participanteId,
        eventoId: Number(id),
      });

      const atualizado = res.data;

      setParticipantes((prev) =>
        prev.map((p) =>
          p.id === participanteId ? { ...p, checkin: atualizado } : p
        )
      );
    } catch (error) {
      console.error("Erro ao fazer check-in/out:", error);
    }
  };

  const filteredParticipantes = participantes.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 pt-24">
      <BotaoVoltar />
      <h2 className="text-2xl font-semibold mb-8 text-center">Participantes</h2>

      <div className="mb-6 max-w-xl mx-auto">
        <Input
          placeholder="Buscar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {filteredParticipantes.map((p) => (
          <Card key={p.id} className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">{p.nome}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              {p.email && <p>Email: {p.email}</p>}
              {p.telefone && <p>Telefone: {p.telefone}</p>}
              <p>
                Status:{" "}
                <span
                  className={
                    p.checkin?.status === "presente"
                      ? "text-green-600 font-semibold"
                      : p.checkin?.status === "ausente"
                      ? "text-red-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {p.checkin?.status === "presente"
                    ? "Presente"
                    : p.checkin?.status === "ausente"
                    ? "Ausente"
                    : "Pendente"}
                </span>
              </p>
              <Button
                className="mt-4"
                variant={
                  p.checkin?.status === "presente" || p.checkin?.status === "pendente"
                    ? "default"
                    : "destructive"
                }
                onClick={() => {
                  if (p.checkin?.status !== "ausente") {
                    toggleCheckin(p.id);
                  }
                }}
                disabled={p.checkin?.status === "ausente"}
              >
                {p.checkin?.status === "presente"
                  ? "Fazer checkout"
                  : p.checkin?.status === "ausente"
                  ? "Checkout realizado"
                  : "Fazer check-in"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ParticipantesPage;

// src/app/eventos/[id]/estatistica/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import BotaoVoltar from "@/components/BotaoVoltar";

interface Estatisticas {
  nome: string;
  capacidade: number;
  totalParticipantes: number;
  totalCheckins: number;
  totalCheckouts: number;
}

const EstatisticaPage = () => {
  const { id } = useParams();
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(false);

  const buscarEstatisticas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/eventos/${id}/estatistica`);
      const data = await res.json();
      setEstatisticas(data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-24">
      <BotaoVoltar />
      <h2 className="text-2xl font-semibold mb-8">Estatísticas do Evento</h2>

      <Button onClick={buscarEstatisticas}>Ver Estatística</Button>

      {loading && <p>Carregando estatísticas...</p>}

      {estatisticas && (
        <div className="space-y-4 mt-10">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-medium">Nome do Evento:</p>
            <p>{estatisticas.nome}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-medium">Capacidade total:</p>
            <p>{estatisticas.capacidade}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-medium">Participantes cadastrados:</p>
            <p>{estatisticas.totalParticipantes}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-medium">Check-ins realizados:</p>
            <p>{estatisticas.totalCheckins}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-medium">Check-outs realizados:</p>
            <p>{estatisticas.totalCheckouts}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstatisticaPage;

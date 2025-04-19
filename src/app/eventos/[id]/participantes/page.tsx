"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

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

  return (
    <div className="min-h-screen px-6 pt-24">
      <h2 className="text-2xl font-semibold mb-8 text-center">Participantes</h2>

      <ul className="space-y-4 max-w-xl mx-auto">
        {participantes.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border p-4 rounded-lg shadow"
          >
            <div>
              <h3 className="text-lg font-medium">{p.nome}</h3>
              <p className="text-sm text-gray-500">{p.email}</p>
              <p className="text-sm text-gray-500">{p.telefone}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={
                    p.checkin?.status === "presente"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {p.checkin?.status === "presente" ? "Presente" : "Ausente"}
                </span>
              </p>
            </div>
            <button
              onClick={() => toggleCheckin(p.id)}
              className={`px-4 py-2 text-white rounded ${
                p.checkin?.status === "presente" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {p.checkin?.status === "presente"
                ? "Fazer checkout"
                : "Fazer check-in"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantesPage;

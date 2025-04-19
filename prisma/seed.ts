// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Criar Eventos
  const evento1 = await prisma.evento.create({
    data: {
      nome: "Evento Exemplo",
      data: new Date("2024-05-10T00:00:00"), // Data com hora zerada
      hora_inicio: new Date("2024-05-10T09:00:00"), // Data + hora de início
      hora_fim: new Date("2024-05-10T18:00:00"), // Data + hora de término
      local: "Sala de Demonstração",
      capacidade: 10,
    },
  });

  const evento2 = await prisma.evento.create({
    data: {
      nome: "Conferência de Tecnologia",
      data: new Date("2024-05-15T00:00:00"), // Data com hora zerada
      hora_inicio: new Date("2024-05-15T09:00:00"), // Data + hora de início
      hora_fim: new Date("2024-05-15T18:00:00"), // Data + hora de término
      local: "Centro de Convenções",
      capacidade: 100,
    },
  });

  // Participantes para o Evento Exemplo
  const participantesEvento1 = await Promise.all([
    prisma.participante.create({
      data: {
        nome: "João Silva",
        email: "joao@email.com",
        telefone: "(11) 99999-1111",
        eventoId: evento1.id,
      },
    }),
    prisma.participante.create({
      data: {
        nome: "Maria Santos",
        email: "maria@email.com",
        telefone: "(11) 99999-2222",
        eventoId: evento1.id,
      },
    }),
    prisma.participante.create({
      data: {
        nome: "Pedro Oliveira",
        email: "pedro@email.com",
        telefone: "(11) 99999-3333",
        eventoId: evento1.id,
      },
    }),
    prisma.participante.create({
      data: {
        nome: "Ana Costa",
        email: "ana@email.com",
        telefone: "(11) 99999-4444",
        eventoId: evento1.id,
      },
    }),
    prisma.participante.create({
      data: {
        nome: "Carlos Pereira",
        email: "carlos@email.com",
        telefone: "(11) 99999-5555",
        eventoId: evento1.id,
      },
    }),
  ]);

  // Check-ins para o Evento Exemplo
  await Promise.all([
    prisma.checkin.create({
      data: {
        participanteId: participantesEvento1[0].id,
        eventoId: evento1.id,
        hora_entrada: new Date("2024-05-10T08:45:00"),
        status: "presente",
      },
    }),
    prisma.checkin.create({
      data: {
        participanteId: participantesEvento1[1].id,
        eventoId: evento1.id,
        hora_entrada: new Date("2024-05-10T09:10:00"),
        status: "presente",
      },
    }),
    prisma.checkin.create({
      data: {
        participanteId: participantesEvento1[2].id,
        eventoId: evento1.id,
        hora_entrada: new Date("2024-05-10T09:30:00"),
        status: "presente",
      },
    }),
    prisma.checkin.create({
      data: {
        participanteId: participantesEvento1[3].id,
        eventoId: evento1.id,
        hora_entrada: new Date("2024-05-10T10:00:00"),
        status: "presente",
      },
    }),
    prisma.checkin.create({
      data: {
        participanteId: participantesEvento1[4].id,
        eventoId: evento1.id,
        hora_entrada: new Date("2024-05-10T10:15:00"),
        status: "presente",
      },
    }),
  ]);

  // Atualizar saídas
  await prisma.checkin.updateMany({
    where: {
      participanteId: {
        in: [participantesEvento1[0].id, participantesEvento1[1].id],
      },
    },
    data: {
      hora_saida: new Date("2024-05-10T12:00:00"),
      status: "saiu",
    },
  });

  // Participantes para a Conferência de Tecnologia (apenas os primeiros 10 como exemplo)
  const participantesConferencia = [
    { nome: "Mariana Costa", telefone: "(11) 98888-1111" },
    { nome: "Ricardo Silva", telefone: "(11) 98888-2222" },
    { nome: "Beatriz Santos", telefone: "(11) 98888-3333" },
    { nome: "Gustavo Oliveira", telefone: "(11) 98888-4444" },
    { nome: "Camila Lima", telefone: "(11) 98888-5555" },
    { nome: "Daniel Pereira", telefone: "(11) 98888-6666" },
    { nome: "Isabela Souza", telefone: "(11) 98888-7777" },
    { nome: "Thiago Alves", telefone: "(11) 98888-8888" },
    { nome: "Laura Santos", telefone: "(11) 98888-9999" },
    { nome: "Felipe Oliveira", telefone: "(11) 98888-0000" },
    { nome: "Amanda Costa", telefone: "(11) 97777-1111" },
    { nome: "Bruno Silva", telefone: "(11) 97777-2222" },
    { nome: "Carolina Santos", telefone: "(11) 97777-3333" },
    { nome: "Diego Oliveira", telefone: "(11) 97777-4444" },
    { nome: "Eduarda Lima", telefone: "(11) 97777-5555" },
    { nome: "Fábio Pereira", telefone: "(11) 97777-6666" },
    { nome: "Gabriela Souza", telefone: "(11) 97777-7777" },
    { nome: "Henrique Alves", telefone: "(11) 97777-8888" },
    { nome: "Iara Santos", telefone: "(11) 97777-9999" },
    { nome: "Jorge Oliveira", telefone: "(11) 97777-0000" },
    { nome: "Larissa Costa", telefone: "(11) 96666-1111" },
    { nome: "Marcelo Silva", telefone: "(11) 96666-2222" },
    { nome: "Natália Santos", telefone: "(11) 96666-3333" },
    { nome: "Otávio Oliveira", telefone: "(11) 96666-4444" },
    { nome: "Patrícia Lima", telefone: "(11) 96666-5555" },
    { nome: "Rafael Pereira", telefone: "(11) 96666-6666" },
    { nome: "Sandra Souza", telefone: "(11) 96666-7777" },
    { nome: "Tiago Alves", telefone: "(11) 96666-8888" },
    { nome: "Vanessa Santos", telefone: "(11) 96666-9999" },
    { nome: "Wagner Oliveira", telefone: "(11) 96666-0000" },
    { nome: "Yasmin Costa", telefone: "(11) 95555-1111" },
    { nome: "Zeca Silva", telefone: "(11) 95555-2222" },
    { nome: "Alice Santos", telefone: "(11) 95555-3333" },
    { nome: "Bernardo Oliveira", telefone: "(11) 95555-4444" },
    { nome: "Clara Lima", telefone: "(11) 95555-5555" },
    { nome: "Davi Pereira", telefone: "(11) 95555-6666" },
    { nome: "Ester Souza", telefone: "(11) 95555-7777" },
    { nome: "Fernando Alves", telefone: "(11) 95555-8888" },
    { nome: "Giovanna Santos", telefone: "(11) 95555-9999" },
    { nome: "Heitor Oliveira", telefone: "(11) 95555-0000" },
    { nome: "Isabela Costa", telefone: "(11) 94444-1111" },
    { nome: "João Silva", telefone: "(11) 94444-2222" },
    { nome: "Karla Santos", telefone: "(11) 94444-3333" },
    { nome: "Leonardo Oliveira", telefone: "(11) 94444-4444" },
    { nome: "Marina Lima", telefone: "(11) 94444-5555" },
    { nome: "Nicolas Pereira", telefone: "(11) 94444-6666" },
    { nome: "Olívia Souza", telefone: "(11) 94444-7777" },
    { nome: "Paulo Alves", telefone: "(11) 94444-8888" },
    { nome: "Quiteria Santos", telefone: "(11) 94444-9999" },
    { nome: "Rogério Oliveira", telefone: "(11) 94444-0000" },
    { nome: "Sofia Costa", telefone: "(11) 93333-1111" },
    { nome: "Thales Silva", telefone: "(11) 93333-2222" },
    { nome: "Úrsula Santos", telefone: "(11) 93333-3333" },
    { nome: "Vitor Oliveira", telefone: "(11) 93333-4444" },
    { nome: "Wanessa Lima", telefone: "(11) 93333-5555" },
    { nome: "Xavier Pereira", telefone: "(11) 93333-6666" },
    { nome: "Yara Souza", telefone: "(11) 93333-7777" },
    { nome: "Zélia Alves", telefone: "(11) 93333-8888" },
    { nome: "Adriana Santos", telefone: "(11) 93333-9999" },
    { nome: "Bruno Oliveira", telefone: "(11) 93333-0000" },
    { nome: "Carla Costa", telefone: "(11) 92222-1111" },
    { nome: "Daniel Silva", telefone: "(11) 92222-2222" },
    { nome: "Elaine Santos", telefone: "(11) 92222-3333" },
    { nome: "Fábio Oliveira", telefone: "(11) 92222-4444" },
    { nome: "Gabriela Lima", telefone: "(11) 92222-5555" },
    { nome: "Henrique Pereira", telefone: "(11) 92222-6666" },
    { nome: "Isadora Souza", telefone: "(11) 92222-7777" },
    { nome: "Júlio Alves", telefone: "(11) 92222-8888" },
    { nome: "Karina Santos", telefone: "(11) 92222-9999" },
    { nome: "Lucas Oliveira", telefone: "(11) 92222-0000" },
    { nome: "Mariana Costa", telefone: "(11) 91111-1111" },
    { nome: "Nelson Silva", telefone: "(11) 91111-2222" },
    { nome: "Olga Santos", telefone: "(11) 91111-3333" },
    { nome: "Paulo Oliveira", telefone: "(11) 91111-4444" },
    { nome: "Quiteria Lima", telefone: "(11) 91111-5555" },
    { nome: "Rafael Pereira", telefone: "(11) 91111-6666" },
    { nome: "Sandra Souza", telefone: "(11) 91111-7777" },
    { nome: "Thiago Alves", telefone: "(11) 91111-8888" },
    { nome: "Úrsula Santos", telefone: "(11) 91111-9999" },
    { nome: "Vitor Oliveira", telefone: "(11) 91111-0000" },
    { nome: "Wanessa Costa", telefone: "(11) 90000-1111" },
    { nome: "Xavier Silva", telefone: "(11) 90000-2222" },
    { nome: "Yara Santos", telefone: "(11) 90000-3333" },
    { nome: "Zélia Oliveira", telefone: "(11) 90000-4444" },
    { nome: "Adriana Lima", telefone: "(11) 90000-5555" },
    { nome: "Bruno Pereira", telefone: "(11) 90000-6666" },
    { nome: "Carla Souza", telefone: "(11) 90000-7777" },
    { nome: "Daniel Alves", telefone: "(11) 90000-8888" },
    { nome: "Elaine Santos", telefone: "(11) 90000-9999" },
    { nome: "Fábio Oliveira", telefone: "(11) 90000-0000" },
  ];

  const batchSize = 20; // Número de participantes a serem criados por lote
  for (let i = 0; i < participantesConferencia.length; i += batchSize) {
    const batch = participantesConferencia.slice(i, i + batchSize);

    await prisma.$transaction(
      batch.map((participante) =>
        prisma.participante.create({
          data: {
            nome: participante.nome,
            email: `${participante.nome
              .toLowerCase()
              .replace(/\s+/g, "")}@email.com`,
            telefone: participante.telefone,
            eventoId: evento2.id,
          },
        })
      )
    );

    console.log(
      `Criado lote de participantes ${i + 1}-${Math.min(
        i + batchSize,
        participantesConferencia.length
      )}`
    );
  }

  console.log("Seed completado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/*
  Warnings:

  - You are about to drop the column `horaEntrada` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `horaSaida` on the `Checkin` table. All the data in the column will be lost.
  - The `status` column on the `Checkin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `horaFim` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `horaInicio` on the `Evento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Checkin" DROP CONSTRAINT "Checkin_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "Checkin" DROP CONSTRAINT "Checkin_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "Participante" DROP CONSTRAINT "Participante_eventoId_fkey";

-- AlterTable
ALTER TABLE "Checkin" DROP COLUMN "horaEntrada",
DROP COLUMN "horaSaida",
ADD COLUMN     "hora_entrada" TIMESTAMP(3),
ADD COLUMN     "hora_saida" TIMESTAMP(3),
ALTER COLUMN "participanteId" DROP NOT NULL,
ALTER COLUMN "eventoId" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT DEFAULT 'pendente';

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "horaFim",
DROP COLUMN "horaInicio",
ADD COLUMN     "hora_fim" TIMESTAMP(3),
ADD COLUMN     "hora_inicio" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Participante" ALTER COLUMN "eventoId" DROP NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

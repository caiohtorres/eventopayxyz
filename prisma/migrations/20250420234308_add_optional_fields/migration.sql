/*
  Warnings:

  - You are about to drop the column `hora_entrada` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `hora_saida` on the `Checkin` table. All the data in the column will be lost.
  - The `status` column on the `Checkin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `hora_fim` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `hora_inicio` on the `Evento` table. All the data in the column will be lost.
  - Made the column `participanteId` on table `Checkin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventoId` on table `Checkin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventoId` on table `Participante` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pendente', 'presente', 'saiu');

-- DropForeignKey
ALTER TABLE "Checkin" DROP CONSTRAINT "Checkin_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "Checkin" DROP CONSTRAINT "Checkin_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "Participante" DROP CONSTRAINT "Participante_eventoId_fkey";

-- AlterTable
ALTER TABLE "Checkin" DROP COLUMN "hora_entrada",
DROP COLUMN "hora_saida",
ADD COLUMN     "horaEntrada" TIMESTAMP(3),
ADD COLUMN     "horaSaida" TIMESTAMP(3),
ALTER COLUMN "participanteId" SET NOT NULL,
ALTER COLUMN "eventoId" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pendente';

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "hora_fim",
DROP COLUMN "hora_inicio",
ADD COLUMN     "horaFim" TIMESTAMP(3),
ADD COLUMN     "horaInicio" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Participante" ALTER COLUMN "eventoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

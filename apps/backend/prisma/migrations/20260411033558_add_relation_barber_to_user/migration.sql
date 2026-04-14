/*
  Warnings:

  - A unique constraint covering the columns `[profissionalId]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "profissionalId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_profissionalId_key" ON "usuarios"("profissionalId");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

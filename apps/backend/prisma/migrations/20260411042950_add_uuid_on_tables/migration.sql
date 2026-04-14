/*
  Warnings:

  - The primary key for the `_AgendamentoToServico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `agendamentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profissionais` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `servicos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_B_fkey";

-- DropForeignKey
ALTER TABLE "agendamentos" DROP CONSTRAINT "agendamentos_profissionalId_fkey";

-- DropForeignKey
ALTER TABLE "agendamentos" DROP CONSTRAINT "agendamentos_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_profissionalId_fkey";

-- AlterTable
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_AgendamentoToServico_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "agendamentos" DROP CONSTRAINT "agendamentos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "usuarioId" SET DATA TYPE TEXT,
ALTER COLUMN "profissionalId" SET DATA TYPE TEXT,
ADD CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "agendamentos_id_seq";

-- AlterTable
ALTER TABLE "profissionais" DROP CONSTRAINT "profissionais_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "profissionais_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "profissionais_id_seq";

-- AlterTable
ALTER TABLE "servicos" DROP CONSTRAINT "servicos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "servicos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "servicos_id_seq";

-- AlterTable
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "profissionalId" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "usuarios_id_seq";

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgendamentoToServico" ADD CONSTRAINT "_AgendamentoToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "agendamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgendamentoToServico" ADD CONSTRAINT "_AgendamentoToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

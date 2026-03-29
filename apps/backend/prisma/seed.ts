import { config } from 'dotenv';
import { profissionais, servicos, Usuario } from '@barbabrutal/core';
import { PrismaClient } from '../generated/prisma/client'; 
import { PrismaPg } from '@prisma/adapter-pg';

config(); 

const prisma = new PrismaClient( {
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

async function seed() {
  console.log('🌱 Iniciando o seed...');
  console.log('🔗 URL do Banco:', process.env.DATABASE_URL ? 'Carregada com sucesso!' : 'FALHOU: .env não encontrado');

  await prisma.agendamento.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.servico.deleteMany();
  await prisma.profissional.deleteMany();

  console.log('⏳ Populando Profissionais...');
  await prisma.profissional.createMany({
    data: profissionais as any,
  });

  console.log('⏳ Populando Serviços...');
  await prisma.servico.createMany({
    data: servicos as any,
  });

  console.log('⏳ Populando Usuários...');
  const senha = '$2b$10$9LQTRK3LRzIddKYW2C4MTelydFzk5Ys4JoROPajNqvYshhrn1PRa6';
  const usuarios: Usuario[] = [
    {
      nome: 'Marcão Machadada',
      email: 'marcao@barbabrutal.app',
      senha,
      telefone: '(11) 99999-9999',
      barbeiro: true,
    },
    {
      nome: 'Gabriel Oliveira',
      email: 'gabriel@barbabrutal.app',
      senha,
      telefone: '(11) 99999-9999',
      barbeiro: false,
    },
  ];

  await prisma.usuario.createMany({ data: usuarios as any });

  console.log('✅ Seed finalizado com sucesso!');
}

seed()
  .catch((e) => {
    console.error('❌ ERRO FATAL NO SEED:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
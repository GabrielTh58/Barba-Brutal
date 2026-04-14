import { Profissional, RepositorioProfissional } from '@barbabrutal/core';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class ProfissionalPrisma implements RepositorioProfissional {
  constructor(private readonly prisma: PrismaService) {}

  criar(profissional: Omit<Profissional, 'id'>): Promise<Profissional> {
    return this.prisma.profissional.create({ data: profissional });
  }
  
  buscarTodos(): Promise<Profissional[]> {
    return this.prisma.profissional.findMany();
  }
}

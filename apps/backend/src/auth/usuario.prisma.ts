import { Injectable } from '@nestjs/common';
import { RepositorioUsuario, Usuario } from '@barbabrutal/core';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UsuarioPrisma implements RepositorioUsuario {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.upsert({
      where: { email: usuario.email },
      update: usuario,
      create: usuario as any,
    });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }
}

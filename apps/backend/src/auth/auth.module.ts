import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuarioPrisma } from './usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';
import { AuthMiddleware } from './auth.middleware';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UsuarioPrisma, BcryptProvider, AuthMiddleware],
  exports: [AuthMiddleware, UsuarioPrisma, BcryptProvider],
})
export class AuthModule {}

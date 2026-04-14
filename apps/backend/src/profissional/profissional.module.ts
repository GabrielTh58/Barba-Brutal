import { Module } from '@nestjs/common';
import { ProfissionalController } from './profissional.controller';
import { ProfissionalPrisma } from './profissional.prisma';
import { DbModule } from '../db/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [ProfissionalController],
  providers: [ProfissionalPrisma],
})
export class ProfissionalModule {}

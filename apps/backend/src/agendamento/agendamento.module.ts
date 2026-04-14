import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoPrisma } from './agendamento.prisma';
import { AuthModule } from '../auth/auth.module';
import { DbModule } from '../db/db.module';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [AgendamentoController],
  providers: [AgendamentoPrisma],
})
export class AgendamentoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AgendamentoController);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfissionalPrisma } from './profissional.prisma';
import { BuscarProfissionais, CadastrarNovoBarbeiro } from '@barbabrutal/core';
import { BcryptProvider } from '../auth/bcrypt.provider';
import { UsuarioPrisma } from '../auth/usuario.prisma';
import { CadastrarBarbeiroDto } from './dto/CadastrarUsuario.dto';

@Controller('profissionais')
export class ProfissionalController {
  constructor(
    private readonly repoProfissional: ProfissionalPrisma,
    private readonly cripto: BcryptProvider,
    private readonly repoUsuario: UsuarioPrisma,
  ) {}

  @Post()
  criarProfissional(@Body() dto: CadastrarBarbeiroDto) {
    const casoDeUso = new CadastrarNovoBarbeiro(this.repoProfissional, this.repoUsuario, this.cripto);
    return casoDeUso.executar(dto);
  }
  
  @Get()
  obterProfissionais() {
    const casoDeUso = new BuscarProfissionais(this.repoProfissional);
    return casoDeUso.executar();
  }
}

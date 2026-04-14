import { IsEmail, IsNumber, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { CadastrarBarbeiroDTO } from '@barbabrutal/core';

export class CadastrarBarbeiroDto implements CadastrarBarbeiroDTO {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsOptional()
  @IsUrl()
  imagemURL?: string;

  @IsOptional()
  @IsNumber()
  avaliacao?: number;

  @IsOptional()
  @IsNumber()
  quantidadeAvaliacoes?: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}
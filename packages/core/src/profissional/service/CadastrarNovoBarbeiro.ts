import CasoDeUso from '../../shared/CasoDeUso'
import { ProvedorCriptografia, RepositorioUsuario } from '../../usuario'
import { Id } from '../../utils/Id'
import Profissional from '../model/Profissional'
import RepositorioProfissional from '../provider/RepositorioProfissional'

export interface CadastrarBarbeiroDTO {
    nome: string
    descricao: string
    imagemURL?: string
    avaliacao?: number
    quantidadeAvaliacoes?: number
    email: string
    senha: string
    telefone?: string
}

export default class CadastrarNovoBarbeiro implements CasoDeUso<CadastrarBarbeiroDTO, Profissional> {
    constructor(
        private readonly repoProfissional: RepositorioProfissional,
        private readonly repoUsuario: RepositorioUsuario,
        private readonly cripto: ProvedorCriptografia

    ) {}

    async executar(dto: CadastrarBarbeiroDTO): Promise<Profissional> {
        const usuarioExistente = await this.repoUsuario.buscarPorEmail(dto.email);
        if(usuarioExistente) throw new Error('Email já cadastrado');

        const novoProfissional = await this.repoProfissional.criar({
            id: Id.gerar(),
            nome: dto.nome,
            descricao: dto.descricao,
            imagemURL: dto.imagemURL ?? '',
            avaliacao: dto.avaliacao ?? 0,
            quantidadeAvaliacoes: dto.quantidadeAvaliacoes ?? 0,
        });

        const senhaCriptografada = await this.cripto.criptografar(dto.senha);
        
        await this.repoUsuario.salvar({
            id: Id.gerar(),
            nome: dto.nome,
            email: dto.email,
            senha: senhaCriptografada,
            profissionalId: novoProfissional.id,
            telefone: dto.telefone,
            barbeiro: true,
        })

        return novoProfissional;
    }
}

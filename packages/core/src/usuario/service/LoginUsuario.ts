import CasoDeUso from '../../shared/CasoDeUso'
import ProvedorCriptografia from '../provider/ProvedorCriptografia'
import RepositorioUsuario from '../provider/RepositorioUsuario'
import Usuario from '../model/Usuario'

type Entrada = {
    email: string
    senha: string
}

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
    constructor(
        private readonly repo: RepositorioUsuario,
        private readonly cripto: ProvedorCriptografia
    ) {}

    async executar(entrada: Entrada): Promise<Usuario> {
        const { email, senha } = entrada

        const usuario = await this.repo.buscarPorEmail(email)
        if (!usuario) throw new Error('Credenciais inválidas')

        const mesmaSenha = await this.cripto.comparar(senha, usuario.senha)
        if (!mesmaSenha) throw new Error('Credenciais inválidas')

        delete usuario.senha
        return usuario
    }
}

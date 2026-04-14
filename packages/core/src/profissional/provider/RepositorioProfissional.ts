import Profissional from '../model/Profissional'

export default interface RepositorioProfissional {
    criar(profissional: Profissional): Promise<Profissional>
    buscarTodos(): Promise<Profissional[]>
}

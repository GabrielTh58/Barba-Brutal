import Agendamento from '../model/Agendamento'

export default interface RepositorioAgendamento {
    criar(agendamento: Agendamento): Promise<Agendamento | void>
    buscarPorId(id: string): Promise<Agendamento | null>
    buscarPorEmail(email: string): Promise<Agendamento[]>
    buscarPorProfissionalEData(profissional: string, data: Date): Promise<Agendamento[]>
    excluir(id: string): Promise<void>
}

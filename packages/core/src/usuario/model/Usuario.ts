export default interface Usuario {
    id?: string
    nome: string
    email: string
    senha?: string
    telefone?: string
    barbeiro?: boolean
    profissionalId?: string
}
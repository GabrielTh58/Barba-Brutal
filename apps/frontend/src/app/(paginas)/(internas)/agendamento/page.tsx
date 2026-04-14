import { buscarProfissionaisCache } from '@/data/api/profissionais.api'
import { buscarServicosCache } from '@/data/api/servicos.api'
import AgendamentoOuPainel from '@/components/agendamento/AgendamentoOuPainel'

export default async function Page() {
    const [profissionais, servicos] = await Promise.all([
        buscarProfissionaisCache(),
        buscarServicosCache(),
    ])

    return <AgendamentoOuPainel profissionais={profissionais} servicos={servicos} />
}

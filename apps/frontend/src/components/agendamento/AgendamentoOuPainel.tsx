'use client'
import { Profissional, Servico } from "@barbabrutal/core"
import CabecalhoComTitulo from "../shared/CabecalhoComTitulo"
import FormularioAgendamento from "./FormularioAgendamento"
import useSessao from "@/data/hooks/useSessao"
import PainelBarbeiro from "./PainelBarbeiro"

interface AgendamentoOuPainelProps {
    profissionais: Profissional[]
    servicos: Servico[]
}

export default function AgendamentoOuPainel({ profissionais, servicos }: AgendamentoOuPainelProps) {
    const { usuario } = useSessao()

    if(usuario?.barbeiro) return <PainelBarbeiro />

    return(
        <div className="flex flex-col gap-5">
            <CabecalhoComTitulo
                titulo="Agendamento de Serviços"
                descricao="Seja atendido exatamente no horário marcado."
            />
            <div className="container flex flex-col items-center px-4 py-8 mb-6 md:p-10">
                <FormularioAgendamento 
                    profissionais={profissionais}
                    servicos={servicos}
                />
            </div>
        </div>
    )   
}
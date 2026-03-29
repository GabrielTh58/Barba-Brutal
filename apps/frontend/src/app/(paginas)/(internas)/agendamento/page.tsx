'use client'

import FormularioAgendamento from '@/components/agendamento/FormularioAgendamento'
import CabecalhoComTitulo from '@/components/shared/CabecalhoComTitulo'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <CabecalhoComTitulo
                titulo="Agendamento de Servicos"
                descricao="Seja atendido exatamente no horário marcado."
            />
            <div className="container flex flex-col items-center px-4 py-8 mb-6 md:p-10">
                <FormularioAgendamento />
            </div>
        </div>
    )
}

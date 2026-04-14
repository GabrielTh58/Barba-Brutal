'use client'
import useAgendamento from "@/data/hooks/useAgendamento"
import useSessao from "@/data/hooks/useSessao"
import { DateUtils } from "@barbabrutal/core"
import { useEffect } from "react"
import CabecalhoComTitulo from "../shared/CabecalhoComTitulo"
import CampoDia from "../shared/formulario/CampoDia"
import ItemAgendamento from "./ItemAgendamento"

export default function PainelBarbeiro() {
    const { usuario, carregando} = useSessao()
    const { data, selecionarData, buscarAgendamentos, agendamentos, deletarAgendamento } = useAgendamento()

    const formatData = data ?? DateUtils.hojeComHoraZerada()

    useEffect(() => {
        if (!usuario?.profissionalId || carregando) return
        buscarAgendamentos(usuario.profissionalId, formatData.toISOString().slice(0, 10))
    }, [formatData, usuario?.profissionalId, carregando]) 


    return (
        <div className="flex flex-col gap-5">
            <CabecalhoComTitulo
                titulo="Agenda do Profissional"
                descricao="Gerencie seus horários e clientes do dia."
            />

            <div className="container flex flex-col px-4 py-8 mb-6 md:p-10 max-w-4xl mx-auto gap-8">
                <div className="w-full">
                    <CampoDia label="Data selecionada" value={formatData} onChange={(d) => selecionarData(d!)} />
                </div>

                {agendamentos.length === 0 ? (
                    <div className='w-full bg-zinc-900/50 border border-zinc-800 px-8 py-12 rounded-2xl flex justify-center items-center'>
                        <span className='text-zinc-500 font-medium'>Nenhum agendamento para esta data.</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                          {agendamentos.map((agendamento) => (
                              <ItemAgendamento 
                                key={agendamento.id}
                                agendamento={agendamento}
                                deletarAgendamento={deletarAgendamento}
                              />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
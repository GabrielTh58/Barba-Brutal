'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import useAPI from '../hooks/useAPI'
import useSessao from '../hooks/useSessao'
import { Agendamento, AgendaUtils, DateUtils, Profissional, Servico } from '@barbabrutal/core'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export interface ContextoAgendamentoProps {
    profissional: Profissional | null
    servicosSelecionados : Servico[]
    data: Date | null
    dataValida: Date | null
    horariosOcupados: string[]
    agendamentos: Agendamento[]
    selecionarProfissional: (profissional: Profissional | null) => void
    selecionarServicos: (servicos: Servico[]) => void
    selecionarData: (data: Date) => void
    agendar: () => Promise<void>
    podeAgendar: () => boolean
    duracaoTotal: () => string
    precoTotal: () => number
    qtdeHorarios: () => number
    buscarAgendamentos: (idProfissional: string, data: string) => Promise<void>
    deletarAgendamento: (id: string) => Promise<void>

}

const ContextoAgendamento = createContext<ContextoAgendamentoProps>({} as any)

export function ProvedorAgendamento(props: any) {
    const { httpPost, httpGet, httpDelete } = useAPI()
    const { usuario } = useSessao()
    const router = useRouter()

    const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
    const [profissional, setProfissional] = useState<Profissional | null>(null)
    const [servicosSelecionados, setServicosSelecionados] = useState<Servico[]>([])
    const [data, setData] = useState<Date>(DateUtils.hojeComHoraZerada())
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

    const dia = data.toISOString().slice(0, 10) ?? ''

    function podeAgendar(): boolean {
        if (!profissional) return false
        if (servicosSelecionados.length === 0) return false
        if (!data) return false
        return data.getHours() >= 8 && data.getHours() <= 20
    }

    function duracaoTotal() {
        return AgendaUtils.duracaoTotal(servicosSelecionados)
    }

    function qtdeHorarios() {
        return servicosSelecionados.reduce((qtde, servico) => qtde + servico.qtdeSlots, 0)
    }

    async function agendar() {
        try {
            await httpPost('/agendamentos', {
                data,
                usuario,
                profissional,
                servicos: servicosSelecionados,
            })
            router.push('/agendamento/sucesso')
            toast.success('Agendamento realizado com sucesso!')
            limpar()
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.'
            toast.error(mensagem ?? 'Ocorreu um erro ao realizar o agendamento. Tente novamente.')
        }
    }

    function limpar() {
        setProfissional(null)
        setServicosSelecionados([])
        setData(DateUtils.hojeComHoraZerada())
    }

    function precoTotal() {
        return servicosSelecionados.reduce((acc, servico) => acc + servico.preco, 0)
    }

    const obterHorariosOcupados = useCallback(
        async function (dia: string, profissional: Profissional): Promise<string[]> {
            if (!dia || !profissional) return []
            const ocupacao = await httpGet(`agendamentos/ocupacao/${profissional!.id}/${dia}`)
            return ocupacao ?? []
        },
        [httpGet]
    )

    const buscarAgendamentos = useCallback(async function (idProfissional: string, data: string) {
        console.log(`Buscando agendamentos para profissional ${idProfissional} na data ${data}`);        
        const resposta = await httpGet(`/agendamentos/${idProfissional}/${data}`)
        setAgendamentos(resposta ?? [])
    }, [httpGet])

    async function deletarAgendamento(idAgendamento: string) {
        try {
            await httpDelete(`/agendamentos/${idAgendamento}`)
            setAgendamentos(prev => prev.filter(a => a.id !== idAgendamento))
            toast.success('Agendamento cancelado com sucesso!')
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.'
            toast.error(mensagem ?? 'Ocorreu um erro ao cancelar o agendamento. Tente novamente.')
        }
    }

    useEffect(() => {
        if (!dia || !profissional) return
        obterHorariosOcupados(dia, profissional).then(setHorariosOcupados)
    }, [dia, profissional, obterHorariosOcupados])

    return (
        <ContextoAgendamento.Provider
            value={{
                profissional,
                servicosSelecionados,
                data,
                get dataValida() {
                    if (!data) return null
                    if (data.getHours() < 8 || data.getHours() > 20) return null
                    return data
                },
                horariosOcupados,
                selecionarProfissional: setProfissional,
                selecionarServicos: setServicosSelecionados,
                selecionarData: setData,
                deletarAgendamento,
                agendar,
                podeAgendar,
                duracaoTotal,
                precoTotal,
                qtdeHorarios,
                buscarAgendamentos,
                agendamentos,
            }}
        >
            {props.children}
        </ContextoAgendamento.Provider>
    )
}

export default ContextoAgendamento

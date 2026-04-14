import useAgendamento from '@/data/hooks/useAgendamento'
import { MoedaUtils, Profissional, Servico } from '@barbabrutal/core'
import { IconCalendar } from '@tabler/icons-react'

export default function Sumario() {
    const { profissional, servicosSelecionados, dataValida, precoTotal, duracaoTotal, podeAgendar, agendar } =
        useAgendamento()

    return (
        <div className="flex flex-col w-full lg:w-96 lg:shrink-0 bg-zinc-900 rounded-lg border border-zinc-800 max-w-[660px]">
            <SumarioTitulo />
            <div className="flex flex-col p-5 gap-6">
                <SumarioProfissional profissional={profissional} />
                <SumarioServicos servicos={servicosSelecionados} />
                <DuracaoTotal duracao={duracaoTotal()} />
                <SumarioData data={dataValida} />
            </div>
            <SumarioValorTotal valor={precoTotal()} />
            <div className="p-5">
                <button
                    onClick={agendar}
                    disabled={!podeAgendar()}
                    className={`
                        button w-full bg-yellow-400 text-black font-semibold
                        ${!podeAgendar() ? 'cursor-not-allowed opacity-50' : 'hover:bg-yellow-500 transition-colors'}
                    `}
                >
                    Finalizar Agendamento
                </button>
            </div>
        </div>
    )
}

function SumarioTitulo() {
    return (
        <div className="flex items-center gap-3 p-5 border-b border-zinc-800">
            <div className="flex justify-center items-center bg-zinc-800 rounded-full h-10 w-10">
                <IconCalendar size={20} stroke={1.5} className="text-zinc-300" />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-zinc-200">Sumário do Agendamento</span>
                <span className="text-xs text-zinc-500">Será um prazer atendê-lo!</span>
            </div>
        </div>
    )
}

function SumarioProfissional(props: { profissional: Profissional | null }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-xs uppercase text-zinc-500 font-semibold tracking-wider">Profissional</span>
            <span className="text-sm text-white">
                {props.profissional ? props.profissional.nome : 'Não selecionado'}
            </span>
        </div>
    )
}

function SumarioServicos(props: { servicos: Servico[] }) {
    function renderizarServico(servico: Servico, i: number) {
        return (
            <div key={servico.id} className="flex items-center bg-zinc-800 rounded-md overflow-hidden">
                <span className="px-3 bg-black/40 py-1.5 text-xs text-zinc-400">{i}</span>
                <span className="font-light text-sm px-3">{servico.nome}</span>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs uppercase text-zinc-500 font-semibold tracking-wider">Serviços</span>
            <div className="flex gap-2 flex-wrap text-white">
                {props.servicos.length === 0 ? (
                    <span className="text-sm text-zinc-400">Nenhum selecionado</span>
                ) : null}
                {props.servicos.map((s, i) => renderizarServico(s, i + 1))}
            </div>
        </div>
    )
}

function DuracaoTotal(props: { duracao: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-xs uppercase text-zinc-500 font-semibold tracking-wider">Duração</span>
            <span className="font-light text-sm">{props.duracao}</span>
        </div>
    )
}

function SumarioData(props: { data: Date | null }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-xs uppercase text-zinc-500 font-semibold tracking-wider">Horário</span>
            <span className="font-light text-sm">
                {!props.data ? (
                    <span className="text-zinc-400">Não selecionado</span>
                ) : (
                    <>
                        {props.data?.toLocaleDateString('pt-BR', { dateStyle: 'long' })}
                        <span className="text-zinc-500 mx-1">às</span>
                        {props.data?.toLocaleTimeString('pt-BR').substring(0, 5)}
                    </>
                )}
            </span>
        </div>
    )
}

function SumarioValorTotal(props: { valor: number }) {
    return (
        <div className="flex justify-between items-center gap-3 border-y border-zinc-800 p-5 bg-zinc-900/50">
            <span className="text-xs uppercase text-zinc-500 font-semibold tracking-wider">Valor Total</span>
            <span className="font-bold text-xl text-yellow-400">{MoedaUtils.formatar(props.valor)}</span>
        </div>
    )
}
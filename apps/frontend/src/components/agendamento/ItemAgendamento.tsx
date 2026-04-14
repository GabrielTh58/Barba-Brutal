import { Agendamento } from "@barbabrutal/core"

interface ItemAgendamentoProps {
    agendamento: Agendamento
    deletarAgendamento: (id: string) => void
}

export default function ItemAgendamento({ agendamento, deletarAgendamento }: ItemAgendamentoProps) {
    return (
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center w-full bg-zinc-800/80 border border-zinc-700 hover:border-zinc-600 transition-colors px-6 py-5 rounded-xl gap-5 shadow-lg'>
            <div className='flex flex-col gap-1'>
                <h3 className='text-xl text-zinc-100 font-semibold'>
                    {agendamento.usuario?.nome || 'Cliente'}
                </h3>

                {agendamento.servicos && (
                    <span className='text-zinc-400 text-sm'>
                        {agendamento.servicos.map((s) => s.nome).join(', ')}
                    </span>
                )}
            </div>

            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 w-full md:w-auto'>
                <div className='flex flex-col sm:text-right'>
                    <span className='text-zinc-500 text-xs uppercase tracking-wider font-semibold'>Horário</span>
                    <span className='text-zinc-200 font-medium'>
                        {new Date(agendamento.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                <div className='flex flex-col sm:text-right'>
                    <span className='text-zinc-500 text-xs uppercase tracking-wider font-semibold'>Total</span>
                    <p className='text-emerald-400 font-bold'>
                        R$ {agendamento.servicos?.reduce((acc: number, s: any) => acc + s.preco, 0).toFixed(2) || '0.00'}
                    </p>
                </div>

                <button 
                    onClick={() => deletarAgendamento(agendamento.id)}
                    className='px-5 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border
                    border-red-500/20 hover:border-red-500 transition-all duration-300 rounded-lg text-sm font-semibold
                    w-full sm:w-auto mt-2 sm:mt-0'
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}
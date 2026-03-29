import { IconCheck, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'

export interface PassosProps {
    labels: string[]
    children: any
    permiteProximoPasso?: boolean[]
    labelAcao?: string
    acao?: () => void
}

export default function Passos(props: PassosProps) {
    const [passoAtual, setPassoAtual] = useState(0)

    function semPassoAnterior() {
        return passoAtual === 0
    }

    function passoAnterior() {
        if (semPassoAnterior()) return
        setPassoAtual(passoAtual - 1)
    }

    function semProximoPasso() {
        return passoAtual === props.labels.length - 1
    }

    function proximoPasso() {
        if (semProximoPasso()) return
        setPassoAtual(passoAtual + 1)
    }

   function renderizarLabels() {
        return (
            <div className="flex justify-center lg:justify-start gap-3 md:gap-6 w-full">
                {props.labels.map((label, i) => {
                    const selecionado = i === passoAtual
                    return (
                        <div key={i} className={`flex items-center gap-2 ${selecionado ? '' : 'opacity-60 md:opacity-100'}`}>
                            <span
                                className={`
                                    flex items-center justify-center shrink-0
                                    w-9 h-9 rounded-full
                                ${selecionado ? 'bg-white text-black font-bold text-sm' : 'bg-zinc-700 text-zinc-400 text-sm'}
                                `}
                            >
                                {i + 1}
                            </span>
                            <span className={`
                                ${selecionado ? 'block' : 'hidden md:block'} 
                                text-sm md:text-base 
                                ${selecionado ? 'text-white font-medium' : 'text-zinc-500'}
                            `}>
                                {label}
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }

    const permiteProximoPasso = props.permiteProximoPasso?.[passoAtual] ?? true

    return (
        <div className="flex-1 flex flex-col items-center lg:items-start gap-10">
            <div>
                {renderizarLabels()}
            </div>
            <div className='w-full justify-center lg:justify-start flex gap-4'>
                {props.children[passoAtual] ?? props.children}
            </div>
            <div className="flex gap-3 w-full justify-center lg:justify-start">
                <button
                    onClick={passoAnterior}
                    disabled={semPassoAnterior()}
                    className={`
                        flex gap-1 items-center button
                        ${semPassoAnterior() ? 'cursor-not-allowed opacity-50' : ''}    
                    `}
                >
                    <IconChevronLeft size={20} />
                    <span>Anterior</span>
                </button>
                {props.acao && semProximoPasso() ? (
                    <button
                        onClick={props.acao}
                        disabled={!permiteProximoPasso}
                        className={`
                            flex gap-1 items-center button bg-yellow-500 text-black
                            ${!permiteProximoPasso ? 'cursor-not-allowed opacity-50' : ''}
                        `}
                    >
                        <IconCheck size={20} />
                        <span>{props.labelAcao ?? 'Finalizar'}</span>
                    </button>
                ) : (
                    <button
                        onClick={proximoPasso}
                        disabled={semProximoPasso() || !permiteProximoPasso}
                        className={`
                            flex gap-1 items-center button
                            ${semProximoPasso() || !permiteProximoPasso ? 'cursor-not-allowed opacity-50' : ''}
                        `}
                    >
                        <IconChevronRight size={20} />
                        <span>Próximo</span>
                    </button>
                )}
            </div>
        </div>
    )
}

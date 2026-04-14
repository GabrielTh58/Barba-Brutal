import { Servico } from '@barbabrutal/core'
import Image from 'next/image'

export interface CampoServicosProps {
    label?: string
    value: Servico[]
    onChange: (value: Servico[]) => void
    servicos: Servico[]
}

function Opcao(props: {
    servico: Servico
    servicoMudou: (s: Servico) => void
    selecionado: boolean
}) {
    return (
        <button
            className={`
                flex flex-col items-center border rounded overflow-hidden select-none
                ${props.selecionado ? 'border-green-400' : 'border-zinc-700'}
            `}
            onClick={() => props.servicoMudou(props.servico)}
        >
            <Image
                src={props.servico.imagemURL}
                height={150}
                width={150}
                alt={props.servico.nome}
            />
            <div
                className={`
                    py-2 w-full text-sm text-center
                    ${props.selecionado ? 'bg-green-400 text-black font-semibold' : 'bg-zinc-700 text-zinc-400'}
                `}
            >
                {props.servico.nome}
            </div>
        </button>
    )
}

export default function CampoServicos({ label, servicos, onChange, value }: CampoServicosProps) {

    function alternarMarcacao(servico: Servico) {
        const marcado = value.some((s) => s.id === servico.id)
        if (marcado) {
            onChange(value.filter((s) => s.id !== servico.id))
        } else {
            onChange([...value, servico])
        }
    }

    if(!servicos.length) return null 
    return (
        <div className="flex flex-col gap-5">
            {label && <span className="text-sm uppercase text-zinc-400">{label}</span>}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-7 self-start">
                {servicos.map((servico) => {
                    return (
                        <Opcao
                            key={servico.id}
                            servico={servico}
                            servicoMudou={alternarMarcacao}
                            selecionado={value.some((s) => s.id === servico.id)}
                        />
                    )
                })}
            </div>
        </div>
    ) 
}

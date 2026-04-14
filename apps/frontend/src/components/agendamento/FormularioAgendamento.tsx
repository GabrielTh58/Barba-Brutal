'use client'
import CampoDataHora from '../shared/formulario/CampoDataHora'
import CampoProfissional from '../profissional/CampoProfissional'
import CampoServicos from '../servico/CampoServicos'
import useAgendamento from '@/data/hooks/useAgendamento'
import Passos from '../shared/Passos'
import Sumario from './Sumario'
import { Profissional, Servico } from '@barbabrutal/core'

interface FormularioAgendamentoProps {
    profissionais: Profissional[]
    servicos: Servico[]
}

export default function FormularioAgendamento({ profissionais, servicos  }: FormularioAgendamentoProps) {
    const {
        profissional,
        servicosSelecionados ,
        data,
        horariosOcupados,
        selecionarProfissional,
        selecionarServicos,
        selecionarData,
        agendar,
        podeAgendar,
        qtdeHorarios,
    } = useAgendamento()

    return (
        <div className="flex flex-col items-center  lg:flex-row w-full gap-10">
            <Passos
                labels={['Selecione o Profissional', 'Selecione os Serviços', 'Escolha o Horário']}
                permiteProximoPasso={[!!profissional, servicosSelecionados .length > 0, podeAgendar()]}
                acao={agendar}
                labelAcao="Agendar"
            >
                <CampoProfissional
                    label="Profissionais disponíveis"
                    value={profissional}
                    onChange={selecionarProfissional}
                    profissionais={profissionais}
                />
                <CampoServicos
                    label="Serviços disponíveis"
                    value={servicosSelecionados }
                    onChange={selecionarServicos}
                    servicos={servicos}
                />
                <CampoDataHora
                    label="Data e Hora"
                    value={data}
                    onChange={(d) => selecionarData(d!)}
                    horariosOcupados={horariosOcupados}
                    qtdeHorarios={qtdeHorarios()}
                />
            </Passos>
            <Sumario />
        </div>
    )
}

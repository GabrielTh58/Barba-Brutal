import ItemProfissional from './ItemProfissional'
import TituloSecao from '../shared/TituloSecao'
import Carregando from '../shared/Carregando'
import { buscarProfissionaisCache } from '@/data/api/profissionais.api'

export default async function NossosProfissionais() {
    const profissionais = await buscarProfissionaisCache()
    
    return (
        <div className="flex flex-col gap-y-16 py-12">
            <TituloSecao
                tag="Time"
                principal="Nossos Brutos"
                secundario="Só os mais brabos estão aqui! Temos o orgulho de ter o time mais qualificado do Brasil!"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {profissionais.map((profissional) => (
                    <ItemProfissional key={profissional.id} profissional={profissional} />
                ))}
            </div>
        </div>
    )
}

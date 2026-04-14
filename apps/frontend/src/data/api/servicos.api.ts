import { Servico } from '@barbabrutal/core'

export async function buscarServicosCache(): Promise<Servico[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    try {
        const resposta = await fetch(`${baseUrl}/servicos`, {
            next: { revalidate: 86400 } 
        })
        if (!resposta.ok) return []
        return resposta.json()
    } catch (error) {
        return []
    }
}
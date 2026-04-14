import { Profissional } from '@barbabrutal/core'

export async function buscarProfissionaisCache(): Promise<Profissional[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    try {
        const resposta = await fetch(`${baseUrl}/profissionais`, {
            next: { revalidate: 86400 } 
        })
        if (!resposta.ok) return []
        return resposta.json()
    } catch (error) {
        return []
    }
}
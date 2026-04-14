import { useCallback } from 'react'
import useSessao from './useSessao'

const URL_BASE = process.env.NEXT_PUBLIC_API_URL

export default function useAPI() {
    const { token } = useSessao()

    const httpGet = useCallback(
        async function (caminho: string) {
            const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
            const urlCompleta = `${URL_BASE}${uri}`

            try {
                const resposta = await fetch(urlCompleta, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                return extrairDados(resposta)
            } catch (error) {
                const mensagem = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.'
                console.error('Erro na requisição GET:', mensagem)
                throw new Error(mensagem)
            }
        },
        [token]
    )

    const httpPost = useCallback(
        async function (caminho: string, body?: any) {
            const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
            const urlCompleta = `${URL_BASE}${uri}`

            try{
                const resposta = await fetch(urlCompleta, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                })
            return extrairDados(resposta)
            } catch (error) {
                const mensagem = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.'
                console.error('Erro na requisição POST:', mensagem)
                throw new Error(mensagem)
            }
        },
        [token]
    )

     const httpDelete = useCallback(
        async function (caminho: string) {
            const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
            const urlCompleta = `${URL_BASE}${uri}`

            try{
                await fetch(urlCompleta, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                })
            } catch (error) {
                const mensagem = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.'
                console.error('Erro na requisição DELETE:', mensagem)
                throw new Error(mensagem)
            }
        },
        [token]
    )

    async function extrairDados(resposta: Response) {
        let conteudo = ''
        try {
            conteudo = await resposta.text()
            return JSON.parse(conteudo)
        } catch (e) {
            return conteudo
        }
    }

    return { httpGet, httpPost, httpDelete }
}

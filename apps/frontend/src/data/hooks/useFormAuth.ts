import { useEffect, useState } from 'react'
import useAPI from './useAPI'
import useSessao from './useSessao'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function useFormAuth() {
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [telefone, setTelefone] = useState('')
    const [carregando, setCarregando] = useState(false)
    
    const { httpPost } = useAPI()
    const { usuario, iniciarSessao } = useSessao()

    const router = useRouter()
    const param = useSearchParams()

    useEffect(() => {
        if (usuario?.email) {
            const destino = param.get('destino') as string
            router.push(destino ? destino : '/')
        }
    }, [usuario, router, param])

    function alterarModo() {
        setModo(modo === 'login' ? 'cadastro' : 'login')
    }


    async function submeter() {
        setCarregando(true)
        try {
            if (modo === 'login') {
                await login()
                toast.success('Login realizado com sucesso!')
            } else {
                await registrar()
                await login()
                toast.success('Conta criada com sucesso!')
            }

            limparFormulario()
        }catch (error: any) {
            const mensagem = 
                error?.response?.data?.message || 
                error?.message || 
                'Erro ao processar solicitação.'
            toast.error(mensagem) 
        } finally {
            setCarregando(false)
        }
    }

    async function login() {
        const token = await httpPost('auth/login', { email, senha })
        iniciarSessao(token)
    }

    async function registrar() {
        await httpPost('auth/registrar', { nome, email, senha, telefone })
    }

    function limparFormulario() {
        setNome('')
        setEmail('')
        setSenha('')
        setTelefone('')
        setModo('login')
    }

    return {
        modo,
        nome,
        email,
        senha,
        telefone,
        alterarNome: setNome,
        alterarEmail: setEmail,
        alterarSenha: setSenha,
        alterarTelefone: setTelefone,
        alterarModo,
        submeter,
        carregando,
    }
}


import { useState } from 'react'
import useAPI from './useAPI'
import useSessao from './useSessao'
import { toast } from "sonner"

export default function useFormAuth() {
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erros, setErros] = useState<any>({})

    const { httpPost } = useAPI()
    const { iniciarSessao } = useSessao()

    function alterarModo() {
        setModo(modo === 'login' ? 'cadastro' : 'login')
        setErros({})
    }

   async function submeter() {
        setErros({})
        const toastId = toast.loading('Processando...')

        try {
            if (modo === 'login' && validar()) {
                await login()
                toast.success('Login realizado com sucesso!', { id: toastId })
                limparFormulario()
            } else if (validar()) {
                await registrar()
                await login()
                toast.success('Conta criada com sucesso!', { id: toastId })
                limparFormulario()
            } else {
                toast.dismiss(toastId)
            }
        } catch (error: any) {
            const mensagem = 
                error?.response?.data?.message || 
                error?.message || 
                'Erro ao processar solicitação.'
            toast.error(mensagem, { id: toastId }) 
        }
    }

    function validar() {
        const erros: any = {}
        if (!email) erros.email = 'E-mail é obrigatório'
        if (!senha) erros.senha = 'Senha é obrigatória'
        if (modo === 'cadastro' && !nome) erros.nome = 'Nome é obrigatório'

        setErros(erros)
        return Object.keys(erros).length === 0
    }

    async function login() {
        const token = await httpPost('auth/login', { email, senha })
        iniciarSessao(token)
    }

    async function registrar() {
        await httpPost('auth/registrar', { nome, email, senha })
    }

    function limparFormulario() {
        setNome('')
        setEmail('')
        setSenha('')
        setModo('login')
        setErros({})
    }

    return {
        modo,
        nome,
        email,
        senha,
        erros,
        alterarNome: setNome,
        alterarEmail: setEmail,
        alterarSenha: setSenha,
        alterarModo,
        submeter,
    }
}

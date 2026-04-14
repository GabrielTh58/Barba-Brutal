import { Loader2 } from "lucide-react"

export interface CarregandoProps {
    texto?: string
    alturaMinima?: string
}

export default function Carregando({ 
    texto = "Carregando...", 
    alturaMinima = "min-h-[300px]" 
}: CarregandoProps) {
    return (
       <div className={`flex flex-col items-center justify-center w-full ${alturaMinima} gap-4`}>
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            
            <span className="text-zinc-400 font-medium animate-pulse">
                {texto}
            </span>
        </div>
    )
}
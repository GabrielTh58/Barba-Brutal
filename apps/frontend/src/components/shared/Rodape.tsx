import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandWhatsapp,
    IconBrandYoutube,
} from '@tabler/icons-react'
import Logo from './Logo'

export default function Rodape() {
    const iconStyle = `text-zinc-400 cursor-pointer transition-all duration-300 hover:text-white hover:scale-110 
        hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`
    
    return (
        <footer className="flex flex-col bg-black text-zinc-400 py-10 gap-10">
            <div className="container flex flex-col md:flex-row max-w-7xl items-center justify-between text-center
                md:text-left gap-5 md:gap-0"
            >
                <Logo />
                <div className="flex flex-col gap-1">
                    <span className="text-2xl font-bold text-zinc-200 pb-2">Sobre</span>
                    <span className="text-sm">Nossa História</span>
                    <span className="text-sm">Política de Privacidade</span>
                    <span className="text-sm">Termos de Uso</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-2xl font-bold text-zinc-200 pb-2">Contato</span>
                    <span className="text-sm">suporte@barbabrutal.app</span>
                    <div className=" text-sm flex items-center gap-2 justify-center md:justify-start">
                        <IconBrandWhatsapp size={20} className="text-green-500" />
                        <span>WhatsApp</span>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col max-w-7xl md:flex-row items-center gap-1.5 justify-between">
                <div className="flex gap-2 ">
                    <IconBrandYoutube size={28} stroke={1}  className={iconStyle} />
                    <IconBrandInstagram size={28} stroke={1} className={iconStyle} />
                    <IconBrandFacebook size={28} stroke={1} className={iconStyle} />
                    <IconBrandLinkedin size={28} stroke={1} className={iconStyle} />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-1.5">
                    <div className="flex gap-1.5">
                        <span>Feito com</span>
                        <span>🪓</span>
                        <span>em {new Date().getFullYear()}</span>
                    </div>
                    <span className="hidden md:inline-block">-</span>
                    <span>Todos os direitos reservados</span>
                </div>
            </div>
        </footer>
    )
}

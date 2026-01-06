import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Scale, 
  Home, 
  Sparkles, 
  TrendingUp, 
  Wrench,
  Cloud,
  Database,
  Shield,
  Lock,
  Headphones,
  Code,
  Activity,
  ArrowLeft,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import ChatSimulation from "./ChatSimulation";

const WHATSAPP_LINK = "https://wa.me/5543984168411?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Koraflow.";

const nichos = [
  { id: 'clinica', label: 'Clínica Médica', icon: Stethoscope },
  { id: 'advocacia', label: 'Advocacia', icon: Scale },
  { id: 'imobiliaria', label: 'Imobiliária', icon: Home },
  { id: 'estetica', label: 'Estética', icon: Sparkles },
  { id: 'corretora', label: 'Corretora', icon: TrendingUp },
  { id: 'oficina', label: 'Oficina', icon: Wrench }
];

const frases = [
  "Atendimento 24/7 sem perder nenhuma oportunidade",
  "Agenda automaticamente e reduz no-shows em até 60%",
  "Responde dúvidas instantaneamente com precisão",
  "Converte leads qualificados enquanto você dorme"
];

const tecnologias = [
  { icon: Cloud, title: 'Servidores na Nuvem', desc: 'Infraestrutura AWS de alta disponibilidade com 99.9% de uptime garantido' },
  { icon: Database, title: 'Banco de Dados Seguro', desc: 'Backups automáticos diários e replicação em múltiplas zonas' },
  { icon: Shield, title: 'Conformidade LGPD', desc: '100% em conformidade com Lei Geral de Proteção de Dados' },
  { icon: Lock, title: 'Criptografia Ponta a Ponta', desc: 'Todos os dados criptografados com AES-256 em repouso e em trânsito' },
  { icon: Headphones, title: 'Suporte Dedicado', desc: 'Time especializado disponível para ajudar sua operação' },
  { icon: Code, title: 'API Integrada', desc: 'Conecte com seus sistemas existentes via API REST e Webhooks' },
  { icon: TrendingUp, title: 'Escalabilidade Automática', desc: 'Cresce automaticamente conforme sua demanda aumenta' },
  { icon: Activity, title: 'Monitoramento 24/7', desc: 'Observabilidade completa e alertas proativos de performance' }
];

interface DemoPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoPopup = ({ open, onOpenChange }: DemoPopupProps) => {
  const [selectedNiche, setSelectedNiche] = useState('clinica');
  const [currentFrase, setCurrentFrase] = useState(0);
  const [showTech, setShowTech] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const phoneSectionRef = useRef<HTMLDivElement>(null);

  // Slider de frases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrase(prev => (prev + 1) % frases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Reset ao fechar e scroll ao topo ao abrir
  useEffect(() => {
    if (!open) {
      setShowTech(false);
      setSelectedNiche('clinica');
      setHasInteracted(false);
    } else {
      // Reset scroll ao topo quando abre
      setTimeout(() => {
        contentRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      }, 50);
    }
  }, [open]);

  const handleNicheClick = (nichoId: string) => {
    setSelectedNiche(nichoId);
    setHasInteracted(true);
    
    // Scroll até o celular quando um nicho é clicado
    setTimeout(() => {
      if (phoneSectionRef.current && contentRef.current) {
        const phoneRect = phoneSectionRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const scrollTop = contentRef.current.scrollTop;
        
        // Calcula a posição relativa do celular dentro do popup
        const phoneTop = phoneRect.top - contentRect.top + scrollTop;
        
        // Scroll suave até o celular (com um pequeno offset para melhor visualização)
        contentRef.current.scrollTo({
          top: phoneTop - 20,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleTalkToSpecialist = () => {
    onOpenChange(false);
    window.open(WHATSAPP_LINK, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        ref={contentRef}
        className="max-w-6xl h-[90vh] md:max-h-[85vh] overflow-y-auto p-0 gap-0 [&>button]:top-2 [&>button]:right-2"
      >
        <DialogTitle className="sr-only">
          {showTech ? 'Tecnologia de Ponta a Ponta' : 'Demonstração do Funcionário Digital'}
        </DialogTitle>
        
        {!showTech ? (
          // TELA DE DEMONSTRAÇÃO
          <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-0 h-full">
            {/* Lado Esquerdo - Primeiro no mobile */}
            <div className="p-4 md:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-border lg:overflow-y-auto order-first">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2">
                Escolha um nicho para ver o <span className="text-violet">Funcionário Digital</span> em ação
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
                Veja como nosso agente de IA atende, agenda e converte clientes automaticamente via WhatsApp
              </p>
              
              {/* Botões de Nicho */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
                {nichos.map((nicho) => {
                  const Icon = nicho.icon;
                  return (
                    <button
                      key={nicho.id}
                      onClick={() => handleNicheClick(nicho.id)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 rounded-xl border transition-all duration-200",
                        selectedNiche === nicho.id
                          ? "border-violet bg-violet/10 text-violet"
                          : "border-border bg-muted/30 hover:border-violet/50 hover:bg-violet/5"
                      )}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-[10px] md:text-xs font-medium text-center">{nicho.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Texto de personalização */}
              <div className="bg-muted/30 rounded-xl p-3 md:p-4 border border-border">
                <p className="text-xs md:text-sm text-muted-foreground">
                  <span className="text-violet font-semibold">Não se limita a esses nichos!</span> Nossa IA é 
                  personalizada especialmente para cada segmento de negócio. Seja qual for sua área de atuação, 
                  desenvolvemos uma solução sob medida que entende as particularidades do seu mercado.
                </p>
              </div>
              
              {/* Botão para ver tecnologia */}
              <Button 
                className="w-full mt-3 md:mt-4 bg-transparent border border-violet/30 text-foreground hover:bg-violet hover:text-white hover:border-violet transition-all"
                onClick={() => setShowTech(true)}
              >
                Conhecer a Tecnologia
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            {/* Lado Direito - Celular */}
            <div ref={phoneSectionRef} className="p-4 md:p-6 lg:p-8 bg-muted/10 lg:overflow-y-auto flex flex-col order-last">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-violet" />
                <h3 className="text-base md:text-lg font-semibold text-foreground">Conversa em Tempo Real</h3>
              </div>
              
              {/* Slider de frases */}
              <div className="h-10 md:h-12 mb-3 md:mb-4 overflow-hidden relative">
                {frases.map((frase, idx) => (
                  <p
                    key={idx}
                    className={cn(
                      "text-xs md:text-sm text-muted-foreground absolute inset-x-0 transition-all duration-500",
                      currentFrase === idx 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-4"
                    )}
                  >
                    {frase}
                  </p>
                ))}
              </div>
              
              {/* Simulação de Chat */}
              <div className="flex-1 flex items-center justify-center">
                <ChatSimulation niche={selectedNiche} autoScroll={hasInteracted} />
              </div>
            </div>
          </div>
        ) : (
          // TELA DE TECNOLOGIA
          <div className="p-4 md:p-6 lg:p-8 overflow-y-auto h-full">
            {/* Header com botão voltar */}
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowTech(false)}
                className="shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                  Tecnologia de <span className="text-violet">Ponta a Ponta</span>
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Toda a infraestrutura empresarial que grandes corporações usam, agora disponível para o seu negócio
                </p>
              </div>
            </div>
            
            {/* Cards de Tecnologia */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {tecnologias.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 md:p-4 rounded-xl border border-border bg-muted/30 hover:border-violet/30 hover:bg-violet/5 transition-all duration-200"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-violet/10 flex items-center justify-center mb-2 md:mb-3">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-violet" />
                    </div>
                    <h4 className="font-semibold text-foreground text-xs md:text-sm mb-1">{tech.title}</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{tech.desc}</p>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Final */}
            <div className="bg-gradient-to-r from-violet/10 to-violet/5 rounded-2xl p-4 md:p-6 lg:p-8 border border-violet/20 text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Pare de <span className="text-violet">Perder Clientes</span>
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-lg mx-auto">
                Cada minuto sem atendimento automático é uma oportunidade perdida. 
                Transforme seu atendimento agora.
              </p>
              
              <Button 
                size="lg"
                className="bg-violet hover:bg-violet/90 text-violet-foreground shadow-glow mb-4"
                onClick={handleTalkToSpecialist}
              >
                Falar com Especialista
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <div className="flex flex-col items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet"></span>
                </span>
                <span className="text-xs md:text-sm font-medium text-violet">
                  Oferta por tempo limitado
                </span>
                <span className="text-xs md:text-sm text-violet/80">
                  30 dias grátis para novos clientes
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoPopup;

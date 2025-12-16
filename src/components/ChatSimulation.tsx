import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, Phone, Video, MoreVertical } from "lucide-react";

type Message = {
  role: 'cliente' | 'kora';
  text: string;
};

type Conversations = {
  [key: string]: Message[];
};

const conversations: Conversations = {
  clinica: [
    { role: 'cliente', text: 'Olá! Gostaria de agendar uma consulta' },
    { role: 'kora', text: 'Olá! 😊 Sou a Kora, assistente virtual da clínica. Ficarei feliz em ajudar! Qual especialidade você procura?' },
    { role: 'cliente', text: 'Dermatologista, por favor' },
    { role: 'kora', text: 'Perfeito! Temos horários disponíveis para Dra. Maria Silva. Qual dia seria melhor? Temos vagas para terça (14h ou 16h) e quinta (10h ou 15h)' },
    { role: 'cliente', text: 'Quinta às 10h seria ótimo!' },
    { role: 'kora', text: 'Excelente! ✅ Agendado para quinta-feira às 10h com Dra. Maria Silva. Enviarei um lembrete 24h antes. Posso ajudar em algo mais?' }
  ],
  advocacia: [
    { role: 'cliente', text: 'Boa tarde! Preciso de uma consulta sobre direito trabalhista' },
    { role: 'kora', text: 'Boa tarde! 😊 Sou a Kora, assistente do escritório. Temos especialistas em direito trabalhista. Pode me contar brevemente sobre o caso?' },
    { role: 'cliente', text: 'Fui demitido sem justa causa e não recebi a rescisão completa' },
    { role: 'kora', text: 'Entendo sua situação. O Dr. Carlos Mendes é especialista nesse tipo de caso. Posso agendar uma consulta inicial? Temos horários segunda às 14h ou quarta às 10h' },
    { role: 'cliente', text: 'Segunda às 14h está ótimo' },
    { role: 'kora', text: 'Perfeito! ✅ Consulta agendada com Dr. Carlos Mendes, segunda às 14h. Traga documentos como carteira de trabalho e contracheques. Até lá!' }
  ],
  imobiliaria: [
    { role: 'cliente', text: 'Olá! Estou procurando um apartamento para alugar' },
    { role: 'kora', text: 'Olá! 😊 Sou a Kora da imobiliária. Terei prazer em ajudar! Qual região você tem preferência e quantos quartos precisa?' },
    { role: 'cliente', text: 'Centro, 2 quartos, até R$ 2.500' },
    { role: 'kora', text: 'Ótimo! Temos 3 opções que se encaixam: um no Edifício Aurora (R$ 2.200), outro na Rua das Flores (R$ 2.400) e um reformado na Av. Central (R$ 2.500). Quer agendar visitas?' },
    { role: 'cliente', text: 'Sim! Pode ser amanhã?' },
    { role: 'kora', text: 'Perfeito! ✅ Agendei visitas para amanhã às 10h, 11h e 12h respectivamente. Nosso corretor João entrará em contato para confirmar. Sucesso na busca!' }
  ],
  estetica: [
    { role: 'cliente', text: 'Oi! Quero agendar uma limpeza de pele' },
    { role: 'kora', text: 'Oi! 😊 Sou a Kora, assistente da clínica de estética. Perfeito! Temos limpeza de pele profunda e express. Qual você prefere?' },
    { role: 'cliente', text: 'A profunda, por favor. Quanto tempo dura?' },
    { role: 'kora', text: 'A limpeza profunda dura cerca de 1h30 e inclui extração, máscara e hidratação. Temos horários quinta às 15h ou sábado às 10h. Qual prefere?' },
    { role: 'cliente', text: 'Sábado às 10h!' },
    { role: 'kora', text: 'Maravilha! ✅ Agendado para sábado às 10h. Dica: venha sem maquiagem para melhores resultados. Enviarei lembrete na sexta. Até lá! 💆‍♀️' }
  ],
  corretora: [
    { role: 'cliente', text: 'Olá, preciso de um seguro para meu carro' },
    { role: 'kora', text: 'Olá! 😊 Sou a Kora da corretora. Vou te ajudar a encontrar o melhor seguro! Qual modelo e ano do veículo?' },
    { role: 'cliente', text: 'Honda Civic 2022' },
    { role: 'kora', text: 'Excelente escolha! Para o Civic 2022, temos opções a partir de R$ 180/mês. Você prefere cobertura básica ou completa com carro reserva?' },
    { role: 'cliente', text: 'Completa com carro reserva, por favor' },
    { role: 'kora', text: 'Perfeito! ✅ Preparei 3 cotações das melhores seguradoras. Posso agendar uma ligação com nosso corretor para explicar os detalhes? Leva só 10 minutos!' }
  ],
  oficina: [
    { role: 'cliente', text: 'Boa tarde! Meu carro está fazendo um barulho estranho' },
    { role: 'kora', text: 'Boa tarde! 😊 Sou a Kora da oficina. Entendo sua preocupação! O barulho é ao frear, acelerar ou em baixa velocidade?' },
    { role: 'cliente', text: 'Quando freio, parece metal raspando' },
    { role: 'kora', text: 'Isso pode indicar desgaste nas pastilhas de freio - importante verificar logo por segurança! Posso agendar uma avaliação gratuita. Temos vaga amanhã às 8h ou 14h' },
    { role: 'cliente', text: '8h da manhã está bom!' },
    { role: 'kora', text: 'Ótimo! ✅ Agendado para amanhã às 8h. A avaliação leva cerca de 30 min e você recebe o orçamento na hora. Qual placa do veículo para registrar?' }
  ]
};

interface ChatSimulationProps {
  niche: string;
}

const ChatSimulation = ({ niche }: ChatSimulationProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = conversations[niche] || conversations.clinica;

  useEffect(() => {
    setVisibleMessages(0);
    setIsTyping(false);
  }, [niche]);

  useEffect(() => {
    if (visibleMessages < messages.length) {
      setIsTyping(true);
      const typingDelay = messages[visibleMessages].role === 'kora' ? 1500 : 800;
      
      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => prev + 1);
      }, typingDelay);

      return () => clearTimeout(timer);
    }
  }, [visibleMessages, messages.length]);

  // Auto-scroll when messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, isTyping]);

  return (
    <div className="mx-auto w-full max-w-[260px] sm:max-w-[280px] md:max-w-[320px]">
      {/* Phone Frame */}
      <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-zinc-700">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden bg-[#0b141a]">
          {/* WhatsApp Header */}
          <div className="bg-[#1f2c34] px-3 py-2 flex items-center gap-2 pt-6">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet to-violet/70 flex items-center justify-center">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">Kora</p>
              <p className="text-emerald-400 text-xs">online</p>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <Video className="w-5 h-5" />
              <Phone className="w-4 h-4" />
              <MoreVertical className="w-5 h-5" />
            </div>
          </div>
          
          {/* Chat Area with WhatsApp pattern background */}
          <div 
            className="h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden"
            style={{
              backgroundColor: '#0b141a',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23182229' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            <div className="h-full overflow-y-auto scrollbar-hide p-3">
              <div className="space-y-2">
                {messages.slice(0, visibleMessages).map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex animate-fade-in",
                      msg.role === 'cliente' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] px-3 py-1.5 text-xs text-white relative",
                        msg.role === 'cliente'
                          ? 'bg-[#005c4b] rounded-lg rounded-tr-none'
                          : 'bg-[#1f2c34] rounded-lg rounded-tl-none'
                      )}
                    >
                      {msg.text}
                      <span className="text-[10px] text-gray-400 ml-2 float-right mt-1">
                        {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && visibleMessages < messages.length && (
                  <div className={cn(
                    "flex",
                    messages[visibleMessages].role === 'cliente' ? 'justify-end' : 'justify-start'
                  )}>
                    <div className={cn(
                      "px-3 py-2 rounded-lg text-xs",
                      messages[visibleMessages].role === 'cliente'
                        ? 'bg-[#005c4b] rounded-tr-none'
                        : 'bg-[#1f2c34] rounded-tl-none'
                    )}>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
          
          {/* WhatsApp Input Area */}
          <div className="bg-[#1f2c34] px-2 py-2 flex items-center gap-2">
            <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
              <span className="text-gray-500 text-xs">Mensagem</span>
            </div>
            <div className="w-8 h-8 bg-[#00a884] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSimulation;

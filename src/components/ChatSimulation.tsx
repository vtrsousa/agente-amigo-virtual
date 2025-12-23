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
    { role: 'cliente', text: 'Oi, boa tarde!' },
    { role: 'kora', text: 'Oi! Boa tarde! 😊 Aqui é a Kora, assistente virtual da clínica. Tudo bem com você?' },
    { role: 'cliente', text: 'Tudo sim, obrigada! Queria agendar uma consulta' },
    { role: 'kora', text: 'Que bom que está tudo bem! 💜 Fico feliz em te ajudar. Você já é paciente aqui conosco ou seria sua primeira consulta?' },
    { role: 'cliente', text: 'Primeira vez, vim por indicação de uma amiga' },
    { role: 'kora', text: 'Ahhh que maravilha! Indicação é sempre a melhor propaganda, né? 😄 Qual especialidade você está buscando?' },
    { role: 'cliente', text: 'Dermatologista, tenho tido alguns problemas de pele' },
    { role: 'kora', text: 'Entendi! Imagino como isso pode ser incômodo... A Dra. Maria Silva é excelente e super querida pelos pacientes. Ela é especialista justamente nesses casos.' },
    { role: 'kora', text: 'Deixa eu ver os horários disponíveis pra você... 🙌 Olha, consegui encaixar! Terça às 14h ou 16h, ou quinta às 10h. Qual fica melhor na sua agenda?' },
    { role: 'cliente', text: 'Quinta às 10h seria perfeito!' },
    { role: 'kora', text: 'Maravilha! ✅ Agendado quinta-feira às 10h com Dra. Maria Silva. Vou te mandar um lembrete pelo WhatsApp 24h antes pra você não esquecer, tá?' },
    { role: 'kora', text: 'Ah, e qualquer coisa que precisar antes da consulta, é só me chamar aqui! Estou sempre por aqui. Cuide-se! 💜' }
  ],
  advocacia: [
    { role: 'cliente', text: 'Boa tarde! Preciso de uma orientação jurídica' },
    { role: 'kora', text: 'Boa tarde! 😊 Aqui é a Kora, assistente do escritório. Tudo bem com você? Como posso te ajudar hoje?' },
    { role: 'cliente', text: 'Tudo bem sim. É sobre direito trabalhista' },
    { role: 'kora', text: 'Certo! Olha, esse é um dos nossos fortes aqui no escritório. Pode ficar tranquilo que você está em boas mãos. Me conta um pouquinho sobre a situação?' },
    { role: 'cliente', text: 'Fui demitido sem justa causa e não recebi a rescisão completa' },
    { role: 'kora', text: 'Puxa, que situação chata... 😔 Infelizmente isso é mais comum do que deveria. Mas a boa notícia é que você tem direitos garantidos por lei.' },
    { role: 'kora', text: 'O Dr. Carlos Mendes é nosso especialista nesse tipo de caso e tem um índice de sucesso altíssimo. Posso agendar uma consulta inicial pra vocês conversarem?' },
    { role: 'cliente', text: 'Sim, por favor! Quanto antes melhor' },
    { role: 'kora', text: 'Perfeito! Entendo a urgência. Deixa eu ver aqui... Temos segunda às 14h ou quarta às 10h. Qual fica melhor pra você?' },
    { role: 'cliente', text: 'Segunda às 14h' },
    { role: 'kora', text: 'Ótimo! ✅ Consulta agendada com Dr. Carlos, segunda às 14h. Dica: traga a carteira de trabalho, contracheques e qualquer documento relacionado, ok?' },
    { role: 'kora', text: 'Fica tranquilo que vamos te ajudar a resolver isso! Qualquer dúvida, estou por aqui. Até segunda! 💜' }
  ],
  imobiliaria: [
    { role: 'cliente', text: 'Olá! Estou procurando um apartamento' },
    { role: 'kora', text: 'Olá! 😊 Aqui é a Kora da imobiliária. Tudo bem? Que legal que está buscando um novo lar! É pra alugar ou comprar?' },
    { role: 'cliente', text: 'Alugar. Preciso de 2 quartos' },
    { role: 'kora', text: 'Entendi! E qual região você tem preferência? Pergunto porque isso faz toda diferença no dia a dia, né? Trabalho, escola, essas coisas...' },
    { role: 'cliente', text: 'Centro, até R$ 2.500 se possível' },
    { role: 'kora', text: 'Boa escolha! O centro tem tudo pertinho. Deixa eu ver aqui o que temos de bom pra você... 🏠' },
    { role: 'kora', text: 'Olha, achei 3 opções ótimas: um no Edifício Aurora (R$ 2.200, reformado), outro na Rua das Flores (R$ 2.400, com varanda) e um na Av. Central (R$ 2.500, mobiliado). Algum te interessou?' },
    { role: 'cliente', text: 'Os três parecem bons! Posso visitar?' },
    { role: 'kora', text: 'Claro! É o melhor jeito de decidir mesmo. Posso agendar as 3 visitas no mesmo dia pra facilitar. Que tal amanhã de manhã?' },
    { role: 'cliente', text: 'Perfeito, pode ser!' },
    { role: 'kora', text: 'Maravilha! ✅ Agendei às 10h, 11h e 12h. O corretor João vai te acompanhar - ele conhece tudo sobre a região. Vai te ligar pra confirmar!' },
    { role: 'kora', text: 'Tenho certeza que você vai encontrar o apê ideal! Qualquer dúvida, é só chamar. Boa sorte! 🏡💜' }
  ],
  estetica: [
    { role: 'cliente', text: 'Oi! Quero saber sobre limpeza de pele' },
    { role: 'kora', text: 'Oi! 😊 Aqui é a Kora da clínica de estética. Tudo bem com você? Que bom que veio falar comigo! Você já fez limpeza de pele antes?' },
    { role: 'cliente', text: 'Já fiz uma vez, mas faz tempo' },
    { role: 'kora', text: 'Ah, entendi! Olha, é super importante fazer com regularidade, sabia? A pele agradece demais! 💆‍♀️ Temos duas opções: a express (45min) e a profunda (1h30). Qual te interessa mais?' },
    { role: 'cliente', text: 'A profunda parece melhor. O que inclui?' },
    { role: 'kora', text: 'Ótima escolha! A profunda é completa: higienização, esfoliação, extração cuidadosa, máscara específica pro seu tipo de pele e hidratação. Você sai de lá renovada! ✨' },
    { role: 'kora', text: 'E o melhor: esse mês estamos com 15% de desconto pra novos clientes. Aproveita que é por tempo limitado!' },
    { role: 'cliente', text: 'Que ótimo! Quero agendar então' },
    { role: 'kora', text: 'Perfeito! Deixa eu ver os melhores horários... Temos quinta às 15h ou sábado às 10h. Qual prefere?' },
    { role: 'cliente', text: 'Sábado às 10h!' },
    { role: 'kora', text: 'Maravilha! ✅ Agendado sábado às 10h. Dica de ouro: venha sem maquiagem pra gente aproveitar melhor o procedimento, ok? Vou te lembrar na sexta!' },
    { role: 'kora', text: 'Vai ficar com a pele incrível! Qualquer dúvida, me chama. Até sábado! 💜' }
  ],
  corretora: [
    { role: 'cliente', text: 'Olá, preciso fazer um seguro pro carro' },
    { role: 'kora', text: 'Olá! 😊 Aqui é a Kora da corretora. Tudo bem? Que bom que veio falar comigo! Proteger o carro é fundamental hoje em dia, né?' },
    { role: 'cliente', text: 'Verdade! É um Honda Civic 2022' },
    { role: 'kora', text: 'Olha, excelente carro! 🚗 E você está certo em querer proteger. Me conta: você usa mais pra trabalho ou lazer? Pergunto porque influencia na cotação.' },
    { role: 'cliente', text: 'Mais pra trabalho, rodo bastante' },
    { role: 'kora', text: 'Entendi! Então faz sentido uma cobertura mais completa. Tenho opções a partir de R$ 180/mês. Você prefere o básico ou completo com carro reserva e assistência 24h?' },
    { role: 'cliente', text: 'Completo, preciso do carro reserva mesmo' },
    { role: 'kora', text: 'Perfeita escolha! Pra quem roda bastante, o carro reserva é essencial. Não pode ficar na mão, né?' },
    { role: 'kora', text: 'Preparei 3 cotações das melhores seguradoras pra você comparar. Mas antes: você já teve sinistro ou é motorista há quanto tempo? Isso pode dar desconto! 💰' },
    { role: 'cliente', text: 'Nunca tive sinistro, dirijo há 8 anos' },
    { role: 'kora', text: 'Perfeito! Isso te dá um baita desconto! ✅ Posso agendar uma ligação rápida com nosso corretor pra fechar os detalhes? Leva só 10 minutinhos.' },
    { role: 'kora', text: 'Ele explica tudo certinho e você contrata na hora se quiser. Qual horário é bom pra você? 💜' }
  ],
  oficina: [
    { role: 'cliente', text: 'Boa tarde! Meu carro está com um barulho estranho' },
    { role: 'kora', text: 'Boa tarde! 😊 Aqui é a Kora da oficina. Tudo bem? Puxa, barulho no carro sempre preocupa mesmo... Me conta mais: onde você está ouvindo esse barulho?' },
    { role: 'cliente', text: 'Quando freio, parece metal raspando' },
    { role: 'kora', text: 'Humm, entendi. Olha, pela sua descrição, pode ser as pastilhas de freio. É importante verificar logo por questão de segurança, tá? 🚗' },
    { role: 'kora', text: 'Mas não se preocupa! É uma das coisas mais comuns que a gente resolve aqui. Qual modelo e ano do seu carro?' },
    { role: 'cliente', text: 'Fiat Argo 2021' },
    { role: 'kora', text: 'Ah, conheço bem esse modelo! Trabalhamos muito com ele. A boa notícia é que as peças são fáceis de encontrar e o serviço é rápido.' },
    { role: 'kora', text: 'Posso agendar uma avaliação gratuita pra amanhã? O mecânico dá uma olhada e já passa o orçamento na hora, sem compromisso. 🔧' },
    { role: 'cliente', text: 'Pode ser! Qual horário tem?' },
    { role: 'kora', text: 'Temos vaga às 8h (mais tranquilo) ou às 14h. Qual prefere?' },
    { role: 'cliente', text: '8h da manhã está ótimo' },
    { role: 'kora', text: 'Perfeito! ✅ Agendado amanhã às 8h. A avaliação leva uns 30 min. Me passa a placa do veículo pra eu já deixar registrado?' },
    { role: 'kora', text: 'E fica tranquilo que vamos resolver! Qualquer dúvida antes, é só chamar. Até amanhã! 💜' }
  ]
};

interface ChatSimulationProps {
  niche: string;
  autoScroll?: boolean;
}

const ChatSimulation = ({ niche, autoScroll = true }: ChatSimulationProps) => {
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
      // Delays maiores para parecer mais humano (30+ segundos no total)
      const typingDelay = messages[visibleMessages].role === 'kora' ? 3000 : 1800;
      
      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => prev + 1);
      }, typingDelay);

      return () => clearTimeout(timer);
    }
  }, [visibleMessages, messages.length]);

  // Auto-scroll when messages appear (só se autoScroll for true)
  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages, isTyping, autoScroll]);

  return (
    <div className="mx-auto w-full max-w-[260px] sm:max-w-[280px] md:max-w-[280px]">
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

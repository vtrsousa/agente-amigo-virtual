import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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

  return (
    <div className="bg-muted/30 rounded-xl p-4 h-[340px] overflow-y-auto border border-border">
      <div className="space-y-3">
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
                "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                msg.role === 'cliente'
                  ? 'bg-violet text-violet-foreground rounded-br-sm'
                  : 'bg-background border border-border rounded-bl-sm'
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && visibleMessages < messages.length && (
          <div className={cn(
            "flex",
            messages[visibleMessages].role === 'cliente' ? 'justify-end' : 'justify-start'
          )}>
            <div className={cn(
              "px-4 py-2 rounded-2xl text-sm",
              messages[visibleMessages].role === 'cliente'
                ? 'bg-violet/50 rounded-br-sm'
                : 'bg-background border border-border rounded-bl-sm'
            )}>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSimulation;

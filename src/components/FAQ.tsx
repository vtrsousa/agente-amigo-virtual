import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona a implementação dos agentes de IA?",
      answer: "Nosso processo é simples e direto: primeiro fazemos uma análise detalhada do seu negócio, depois desenvolvemos soluções personalizadas e implementamos com treinamento completo da sua equipe."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "A maioria dos nossos clientes vê melhorias significativas nos primeiros 30 dias. Resultados como automação de processos e atendimento 24/7 são imediatos."
    },
    {
      question: "É necessário conhecimento técnico para usar as soluções?",
      answer: "Não! Nossas soluções são projetadas para serem intuitivas. Fornecemos treinamento completo e suporte contínuo para garantir que sua equipe aproveite ao máximo a tecnologia."
    },
    {
      question: "As soluções se integram com sistemas existentes?",
      answer: "Sim, desenvolvemos integrações personalizadas com os principais sistemas empresariais, CRMs, ERPs e plataformas digitais que sua empresa já utiliza."
    },
    {
      question: "Qual é o investimento necessário?",
      answer: "Cada projeto é único e o investimento varia conforme suas necessidades específicas. Oferecemos uma consulta gratuita para avaliar seu caso e apresentar opções adequadas ao seu orçamento."
    },
    {
      question: "Vocês oferecem suporte após a implementação?",
      answer: "Sim! Oferecemos suporte técnico contínuo, atualizações regulares e acompanhamento estratégico para garantir que você obtenha o máximo retorno do investimento."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-subtle" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Encontre respostas para as principais questões sobre nossas soluções de IA.
            </p>
          </div>

          <Accordion type="single" collapsible className="mb-12 animate-fade-in">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-gradient-card rounded-2xl p-8 text-center animate-fade-in border border-border/50">
            <h3 className="text-2xl font-bold mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe está disponível para esclarecer qualquer dúvida específica sobre sua implementação.
            </p>
            <Button 
              size="lg"
              className="shadow-glow hover:shadow-[0_0_60px_hsl(256_60%_36%/0.3)] px-10 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105"
              onClick={() => {
                const chatButton = document.getElementById('chat-button');
                chatButton?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                chatButton?.click();
              }}
            >
              Falar com Especialista
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

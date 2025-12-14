import { Card } from "@/components/ui/card";
import { ShoppingBag, Headphones, Briefcase, GraduationCap } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const useCases = [
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description: "Recomendações personalizadas, rastreamento de pedidos e suporte pós-venda automatizado.",
    metrics: "Aumento de 45% nas vendas"
  },
  {
    icon: Headphones,
    title: "Suporte Técnico",
    description: "Resolução de problemas técnicos, tutoriais interativos e escalação inteligente para especialistas.",
    metrics: "Redução de 70% em tickets"
  },
  {
    icon: Briefcase,
    title: "Serviços Financeiros",
    description: "Consultas de saldo, transações, investimentos e atendimento personalizado com segurança máxima.",
    metrics: "98% de satisfação"
  },
  {
    icon: GraduationCap,
    title: "Educação",
    description: "Suporte a alunos, esclarecimento de dúvidas, agendamentos e acompanhamento de progresso.",
    metrics: "Engajamento +60%"
  }
];

const UseCases = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="py-12 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Casos de Uso <span className="text-violet">Comprovados</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Empresas de diversos setores já transformaram seu atendimento
          </p>
        </div>
        
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card 
                key={index}
                className={`p-6 md:p-8 gradient-subtle shadow-soft card-hover group scroll-hidden stagger-${index + 1} ${gridVisible ? 'scroll-visible' : ''} border-border hover:border-violet/30`}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-violet/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-violet/20 transition-colors">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-violet icon-hover" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">{useCase.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
                  {useCase.description}
                </p>
                <div className="pt-3 md:pt-4 border-t border-border">
                  <span className="text-xs md:text-sm font-semibold text-violet">
                    {useCase.metrics}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
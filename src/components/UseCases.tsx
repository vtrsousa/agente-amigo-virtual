import { Card } from "@/components/ui/card";
import { ShoppingBag, Headphones, Briefcase, GraduationCap } from "lucide-react";

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
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Casos de Uso Comprovados
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empresas de diversos setores já transformaram seu atendimento
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card 
                key={index}
                className="p-8 gradient-subtle shadow-soft hover:shadow-glow transition-smooth group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {useCase.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-primary">
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

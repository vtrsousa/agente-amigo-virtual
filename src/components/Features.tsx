import { Bot, Zap, Shield, BarChart3, Globe, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "IA Avançada",
    description: "Tecnologia de ponta que compreende contexto e intenção para respostas precisas e naturais."
  },
  {
    icon: Zap,
    title: "Respostas Instantâneas",
    description: "Atendimento em tempo real sem filas de espera, melhorando a experiência do cliente."
  },
  {
    icon: Shield,
    title: "Segurança Garantida",
    description: "Proteção de dados e conformidade com LGPD e regulamentações internacionais."
  },
  {
    icon: BarChart3,
    title: "Análises Inteligentes",
    description: "Insights detalhados sobre interações e comportamento dos clientes em tempo real."
  },
  {
    icon: Globe,
    title: "Multilíngue",
    description: "Atendimento em diversos idiomas com tradução automática e precisa."
  },
  {
    icon: MessageSquare,
    title: "Integração Total",
    description: "Conecte-se facilmente com suas ferramentas de CRM, chat e sistemas existentes."
  }
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Recursos Que Fazem a Diferença
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologia de ponta para transformar cada interação em uma experiência excepcional
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-8 gradient-subtle shadow-soft hover:shadow-glow transition-smooth hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

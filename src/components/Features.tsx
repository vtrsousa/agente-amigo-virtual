import { Bot, Zap, Shield, BarChart3, Globe, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="py-12 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Recursos Que <span className="text-violet">Fazem a Diferença</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologia de ponta para transformar cada interação em uma experiência excepcional
          </p>
        </div>
        
        <div 
          ref={carouselRef}
          className={`scroll-hidden ${carouselVisible ? 'scroll-visible' : ''}`}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <CarouselItem 
                    key={index} 
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="p-6 md:p-8 bg-secondary/50 border-border hover:border-violet/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet/10 h-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-violet/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-violet/20 transition-colors">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-violet" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Features;
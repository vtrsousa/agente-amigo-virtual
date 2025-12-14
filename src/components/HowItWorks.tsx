import { CheckCircle2 } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    title: "Treinamento Personalizado",
    description: "Seu agente aprende tudo sobre seu negócio, produtos, serviços e a forma como você se comunica com clientes."
  },
  {
    number: "02",
    title: "Atendimento 24/7",
    description: "Nunca mais perca um cliente. Seu agente trabalha incansavelmente, respondendo em segundos, a qualquer hora."
  },
  {
    number: "03",
    title: "Evolução Contínua",
    description: "O agente nunca falha em aprender. A cada interação, ele se torna mais inteligente e eficiente."
  }
];

const HowItWorks = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-12 md:py-24 relative">
      <div className="absolute inset-0 gradient-subtle" />
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Como <span className="text-violet">Funciona</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Um agente inteligente treinado especificamente para o seu negócio, que nunca dorme, nunca falha e trabalha incansavelmente para você
          </p>
        </div>
        
        <div ref={stepsRef} className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative mb-8 md:mb-12 last:mb-0 scroll-hidden stagger-${index + 1} ${stepsVisible ? 'scroll-visible' : ''}`}
            >
              <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-center">
                {/* Number */}
                <div className="md:col-span-2 flex justify-center md:justify-start">
                  <div className="text-5xl md:text-7xl font-bold text-violet/20">
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="md:col-span-10">
                  <div className="gradient-subtle p-6 md:p-8 rounded-3xl shadow-soft relative overflow-hidden card-hover group border border-border hover:border-violet/30">
                    <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-violet/5 rounded-full blur-3xl" />
                    <div className="relative">
                      <div className="flex items-start gap-3 md:gap-4">
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-violet flex-shrink-0 mt-1 icon-hover" />
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">{step.title}</h3>
                          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-[8.33%] top-full h-12 w-0.5 bg-gradient-to-b from-violet/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
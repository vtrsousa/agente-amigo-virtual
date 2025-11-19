import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Configure seu Agente",
    description: "Personalize o agente de IA com a identidade da sua marca, tom de voz e conhecimento específico do seu negócio em minutos."
  },
  {
    number: "02",
    title: "Integre aos Canais",
    description: "Conecte o agente aos seus canais de atendimento: site, WhatsApp, redes sociais e sistemas existentes com poucos cliques."
  },
  {
    number: "03",
    title: "Atenda com Excelência",
    description: "Deixe a IA trabalhar 24/7 enquanto você monitora métricas, analisa insights e melhora continuamente o atendimento."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Três passos simples para revolucionar seu atendimento ao cliente
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative mb-12 last:mb-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid md:grid-cols-12 gap-8 items-center">
                {/* Number */}
                <div className="md:col-span-2 flex justify-center md:justify-start">
                  <div className="text-7xl font-bold text-primary/20">
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="md:col-span-10">
                  <div className="gradient-subtle p-8 rounded-3xl shadow-soft relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground text-lg leading-relaxed">
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
                <div className="hidden md:block absolute left-[8.33%] top-full h-12 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

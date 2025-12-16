import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tecnologia <span className="text-violet">avançada</span> + assessoria estratégica
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Não somos apenas mais uma agência de tecnologia. Na Koraflow, combinamos expertise técnica com pensamento estratégico.
          </p>
          <p className="text-lg text-muted-foreground mb-10">
            Nossa abordagem é colaborativa e transparente, garantindo que você esteja envolvido em cada etapa da jornada rumo à transformação com IA.
          </p>
          <div className="text-center">
            <Button 
              size="lg" 
              className="shadow-glow hover:shadow-[0_0_60px_hsl(var(--violet)/0.4)] px-10 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105 shimmer-effect bg-violet hover:bg-violet/90 text-violet-foreground"
              onClick={() => window.open('https://w.app/koraflow', '_blank')}
            >
              Falar com Especialista
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Sem cartão de crédito • Configuração em minutos • Suporte em português
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
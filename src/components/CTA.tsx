import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-card p-12 lg:p-16 rounded-3xl shadow-glow text-center animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Pronto para Revolucionar seu Atendimento?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Junte-se a centenas de empresas que já transformaram a experiência 
              dos seus clientes com agentes de IA inteligentes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-glow group">
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="mr-2 w-4 h-4" />
                Falar com Especialista
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8">
              Sem cartão de crédito • Configuração em minutos • Suporte em português
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

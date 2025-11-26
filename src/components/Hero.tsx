import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Zap, Calendar, Brain, Building2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Olá! Eu sou a <span className="text-primary font-bold">Kora</span> da Koraflow</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              As <span className="text-primary">Melhores Soluções</span> de IA para o Atendimento do Seu Negócio
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Transforme a experiência dos seus clientes com atendimento personalizado, 
              inteligente e disponível 24/7. Nossa tecnologia de IA aprende e se adapta 
              para oferecer soluções precisas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="shadow-glow group">
                Começar Agora
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Ver Demonstração
              </Button>
            </div>
            
            {/* Feature Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 max-w-3xl mx-auto">
              <div className="gradient-subtle px-4 py-2 rounded-2xl border border-primary/20 hover:border-primary/40 transition-smooth">
                <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xs font-semibold text-primary">Respostas Rápidas</div>
              </div>
              <div className="gradient-subtle px-4 py-2 rounded-2xl border border-primary/20 hover:border-primary/40 transition-smooth">
                <Calendar className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xs font-semibold text-primary">Agenda Automática</div>
              </div>
              <div className="gradient-subtle px-4 py-2 rounded-2xl border border-primary/20 hover:border-primary/40 transition-smooth">
                <Brain className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xs font-semibold text-primary">CRM Inteligente</div>
              </div>
              <div className="gradient-subtle px-4 py-2 rounded-2xl border border-primary/20 hover:border-primary/40 transition-smooth">
                <Building2 className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xs font-semibold text-primary">Multi Negócios</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

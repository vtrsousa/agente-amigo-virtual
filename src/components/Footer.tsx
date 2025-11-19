import { Bot } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">AgentesIA</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 AgentesIA. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Termos
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

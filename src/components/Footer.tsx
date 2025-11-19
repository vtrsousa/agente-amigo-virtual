import { Bot, Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">Koraflow</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2025 Koraflow. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contato@koraflow.com"
              className="text-muted-foreground hover:text-primary transition-smooth"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

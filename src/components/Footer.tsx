import { Instagram, Facebook, Mail } from "lucide-react";
import logo from "@/assets/Logo-Koraflow-2.png";
import qrCode from "@/assets/qr-code-whatsapp.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Koraflow" className="h-8" />
          </div>
          
          {/* QR Code */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src={qrCode} 
              alt="QR Code WhatsApp Koraflow" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-white p-1"
            />
            <span className="text-xs text-muted-foreground text-center">
              Escaneie para falar conosco
            </span>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-muted-foreground text-center">
            © 2025 Koraflow. Todos os direitos reservados.
          </div>
          
          {/* Social Links */}
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/koraflow.ia/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-violet transition-smooth"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/people/Koraflow/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-violet transition-smooth"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contato@koraflow.com.br"
              className="text-muted-foreground hover:text-violet transition-smooth"
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

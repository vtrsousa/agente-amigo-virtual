import { Instagram, Facebook, Mail } from "lucide-react";
import logoLight from "@/assets/Logo-Koraflow-2.png";
import logoDark from "@/assets/logo-roxo.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logo = mounted && resolvedTheme === "dark" ? logoDark : logoLight;

  const quickLinks = [
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Recursos", href: "#recursos" },
    { label: "Casos de Uso", href: "#casos-de-uso" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Koraflow"
              width={145}
              height={32}
              className="object-contain"
              style={{ width: "145px", height: "32px" }}
            />
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-violet transition-smooth"
                >
                  {link.label}
                </a>
              ))}
            </div>
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

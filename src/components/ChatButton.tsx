import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        id="chat-button"
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-glow hover:shadow-[0_0_60px_hsl(var(--violet)/0.5)] p-0 transition-all duration-300 hover:scale-110 pulse-glow bg-violet hover:bg-violet/90 text-violet-foreground"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-7 w-7" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Fale com um Especialista</SheetTitle>
            <SheetDescription>
              Nossa equipe está pronta para ajudar você a transformar seu negócio com IA.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              Este é um espaço reservado para o chat. Em breve, você poderá conversar diretamente com nossa equipe.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatButton;
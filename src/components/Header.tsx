import logo from "@/assets/Logo-Koraflow.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img src={logo} alt="Koraflow" className="h-10" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

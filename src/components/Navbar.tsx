import { useState } from "react";
import { motion } from "framer-motion";
import AuthDialog from "@/components/AuthDialog";
import { Button } from "@/components/ui/button";

type AuthTab = "login" | "register";

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  const openAuth = (tab: AuthTab) => {
    setActiveTab(tab);
    setIsAuthOpen(true);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-4 px-6 md:px-12 py-4 bg-background/60 backdrop-blur-md border-b border-border/30"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl text-primary">☸</span>
          <div>
            <h2 className="text-lg md:text-xl font-display text-gold-gradient tracking-wider">
              Ancient Sri Lanka
            </h2>
            <p className="hidden md:block text-sm font-accent text-foreground/75">
              Interactive Digital Museum
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/40 bg-background/70 text-foreground hover:bg-primary/15 hover:text-primary"
            onClick={() => openAuth("login")}
          >
            Login
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
            onClick={() => openAuth("register")}
          >
            Register
          </Button>
        </div>
      </motion.nav>

      <AuthDialog
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
};

export default Navbar;

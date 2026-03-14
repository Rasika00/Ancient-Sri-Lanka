import { motion } from "framer-motion";

const Navbar = () => {
  return (
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

      <p className="hidden md:block text-sm font-accent text-foreground/75">
        Sacred Historical Experience
      </p>
    </motion.nav>
  );
};

export default Navbar;

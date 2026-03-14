import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import BraceletScene from "@/components/BraceletScene";
import GemLabels from "@/components/GemLabels";
import PlaceDetail from "@/components/PlaceDetail";
import Navbar from "@/components/Navbar";
import AuthDialog from "@/components/AuthDialog";
import { Button } from "@/components/ui/button";
import { historicalPlaces } from "@/data/places";

type AuthTab = "login" | "register";
const AUTH_STORAGE_KEY = "ancient-sri-lanka-authenticated";
const REGISTERED_USER_KEY = "ancient-sri-lanka-registered-user";

interface RegisteredUser {
  fullName: string;
  email: string;
  password: string;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>("login");
  const [loading, setLoading] = useState(true);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    const hasRegisteredUser = !!localStorage.getItem(REGISTERED_USER_KEY);
    setIsAuthenticated(storedAuth && hasRegisteredUser);
    setAuthReady(true);
  }, []);

  const handleGemClick = useCallback((id: string) => {
    setSelectedPlaceId(id);
  }, []);

  const handleAuthSuccess = useCallback(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsAuthenticated(true);
    setLoading(true);
  }, []);

  const handleRegister = useCallback(
    ({ fullName, email, password }: { fullName: string; email: string; password: string }) => {
      if (!fullName || !email || !password) {
        return { ok: false, message: "Please complete all fields." };
      }

      const registeredUser: RegisteredUser = {
        fullName,
        email: email.toLowerCase(),
        password,
      };

      localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(registeredUser));
      return { ok: true, message: `Account created for ${fullName}.` };
    },
    []
  );

  const handleLogin = useCallback(({ email, password }: { email: string; password: string }) => {
    const storedUserRaw = localStorage.getItem(REGISTERED_USER_KEY);

    if (!storedUserRaw) {
      return { ok: false, message: "No account found. Please register first." };
    }

    let storedUser: RegisteredUser;
    try {
      storedUser = JSON.parse(storedUserRaw) as RegisteredUser;
    } catch {
      return { ok: false, message: "Saved account data is invalid. Please register again." };
    }

    const isEmailMatch = storedUser.email === email.toLowerCase();
    const isPasswordMatch = storedUser.password === password;

    if (!isEmailMatch || !isPasswordMatch) {
      return { ok: false, message: "Use the same email and password used during registration." };
    }

    return { ok: true, message: `Welcome back, ${storedUser.fullName || storedUser.email}.` };
  }, []);

  const selectedPlace = historicalPlaces.find((p) => p.id === selectedPlaceId);

  if (!authReady) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center px-6">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-8 w-52 h-52 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-xl rounded-lg border border-primary/25 bg-card/90 p-8 md:p-10 backdrop-blur-md text-center shadow-gold"
        >
          <p className="font-accent text-primary text-lg">Protected Access</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-display text-gold-gradient tracking-wider">
            ARCANE NEXUS RELIC
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/85 font-body leading-relaxed">
            Register first, then log in with the same email and password to unlock the museum.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary/40 bg-background/70 text-foreground hover:bg-primary/15 hover:text-primary"
              onClick={() => {
                setAuthTab("login");
                setAuthDialogOpen(true);
              }}
            >
              Login
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold"
              onClick={() => {
                setAuthTab("register");
                setAuthDialogOpen(true);
              }}
            >
              Register
            </Button>
          </div>
        </motion.div>

        <AuthDialog
          open={authDialogOpen}
          onOpenChange={setAuthDialogOpen}
          activeTab={authTab}
          onTabChange={setAuthTab}
          onAuthenticated={handleAuthSuccess}
          onRegister={handleRegister}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Main 3D bracelet area */}
      <motion.div
        className="relative h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Instructions */}
        <motion.div
          className="absolute top-20 md:top-24 left-0 right-0 text-center z-10 px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-gold-gradient tracking-wider">
            ARCANE NEXUS RELIC
          </h1>
          <p className="mt-3 text-sm md:text-lg font-body text-muted-foreground max-w-xl mx-auto">
            Rotate the ancient bracelet and click the glowing gems to discover 
            the sacred historical treasures of Sri Lanka
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <div className="flex-1 pt-16" style={{ minHeight: "60vh" }}>
          <BraceletScene onGemClick={handleGemClick} />
        </div>

        {/* Gem labels at bottom */}
        <GemLabels onPlaceClick={handleGemClick} />
      </motion.div>

      {/* Place detail overlay */}
      <AnimatePresence>
        {selectedPlace && (
          <PlaceDetail
            place={selectedPlace}
            onBack={() => setSelectedPlaceId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

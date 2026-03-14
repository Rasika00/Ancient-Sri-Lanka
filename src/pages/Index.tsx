import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import BraceletScene from "@/components/BraceletScene";
import GemLabels from "@/components/GemLabels";
import PlaceDetail from "@/components/PlaceDetail";
import Navbar from "@/components/Navbar";
import { historicalPlaces } from "@/data/places";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const handleGemClick = useCallback((id: string) => {
    setSelectedPlaceId(id);
  }, []);

  const selectedPlace = historicalPlaces.find((p) => p.id === selectedPlaceId);

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
            The Royal Bracelet
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

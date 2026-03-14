import { motion } from "framer-motion";
import { historicalPlaces } from "@/data/places";

interface GemLabelsProps {
  onPlaceClick: (id: string) => void;
}

const GemLabels = ({ onPlaceClick }: GemLabelsProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 z-10 px-4">
      {historicalPlaces.map((place, i) => (
        <motion.button
          key={place.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          onClick={() => onPlaceClick(place.id)}
          className="group flex items-center gap-2 px-4 py-2 rounded border border-primary/30 bg-card/80 backdrop-blur-sm hover:border-primary hover:shadow-gold transition-all duration-300"
        >
          <span
            className="h-3 w-3 rounded-full animate-glow-pulse"
            style={{ backgroundColor: place.color }}
          />
          <span className="text-sm font-display text-foreground group-hover:text-primary transition-colors">
            {place.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default GemLabels;

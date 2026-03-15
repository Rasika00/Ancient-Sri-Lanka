import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowLeft, MapPin, Landmark, BookOpen, ImageIcon, ExternalLink } from "lucide-react";
import { HistoricalPlace } from "@/data/places";

// Image imports
import sigiriyaImg from "@/assets/sigiriya.jpg";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const placeImages: Partial<Record<string, string[]>> = {
  sigiriya: [sigiriyaImg, publicAsset("place-images/sigiriya-2.png")],
  pahiyangala: [publicAsset("place-images/pahiyangala-2.png"), publicAsset("place-images/pahiyangala-1.png")],
};

const GalleryImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="h-full w-full bg-card flex items-center justify-center text-center text-foreground/85 px-6">
        <div>
          <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50 text-primary" />
          <p className="font-accent text-sm">Photo unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
      onError={() => setHasError(true)}
    />
  );
};

interface PlaceDetailProps {
  place: HistoricalPlace;
  onBack: () => void;
}

const PlaceDetail = ({ place, onBack }: PlaceDetailProps) => {
  const galleryImages = useMemo(() => placeImages[place.id] ?? [], [place.id]);
  const heroImage = galleryImages[0];
  const mapLink = useMemo(() => {
    const query = encodeURIComponent(`${place.name} Sri Lanka`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }, [place.name]);

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-y-auto bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded border border-primary/40 bg-card/95 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-all font-display text-sm shadow-gold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Bracelet
      </motion.button>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {heroImage ? (
          <motion.img
            src={heroImage}
            alt={place.name}
            className="h-full w-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(196,162,101,0.35),_transparent_45%),linear-gradient(135deg,_hsl(var(--card)),_hsl(var(--background)))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="font-accent text-primary text-xl md:text-2xl mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">{place.sinhalaName}</p>
            <h1 className="text-4xl md:text-7xl font-display text-gold-gradient tracking-wider">
              {place.name}
            </h1>
            <div className="mt-5 inline-flex items-center gap-2 rounded border border-white/15 bg-black/35 px-4 py-2 text-foreground/95 backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-body text-lg">
                {place.coordinates.lat.toFixed(4)}°N, {place.coordinates.lng.toFixed(4)}°E
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 space-y-16">
        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display text-foreground">Historical Overview</h2>
          </div>
          <div className="border-l-2 border-primary/30 pl-6">
            <p className="text-lg md:text-xl font-body text-foreground/90 leading-relaxed">
              {place.description}
            </p>
          </div>
        </motion.section>

        {/* Cultural Significance */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Landmark className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display text-foreground">Cultural Significance</h2>
          </div>
          <div className="bg-card border border-border rounded p-6 md:p-8">
            <p className="text-lg font-body text-foreground/90 leading-relaxed">
              {place.culturalSignificance}
            </p>
          </div>
        </motion.section>

        {/* Image Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display text-foreground">Gallery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video rounded overflow-hidden border border-border">
              {heroImage ? (
                <GalleryImage src={heroImage} alt={place.name} />
              ) : (
                <div className="h-full w-full bg-card flex items-center justify-center text-center text-foreground/85 px-6">
                  <div>
                    <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50 text-primary" />
                    <p className="font-accent text-sm">Photo gallery coming soon</p>
                  </div>
                </div>
              )}
            </div>
            <div className="aspect-video rounded overflow-hidden border border-border bg-card flex items-center justify-center">
              {galleryImages[1] ? (
                <GalleryImage src={galleryImages[1]} alt={`${place.name} secondary view`} />
              ) : (
                <div className="text-center text-foreground/85 px-6">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50 text-primary" />
                  <p className="font-accent text-sm">More images coming soon</p>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Map */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display text-foreground">Location</h2>
          </div>
          <div className="rounded border border-border bg-card/70 p-6 md:p-8">
            <p className="text-base md:text-lg font-body text-foreground/90 leading-relaxed">
              Open the location in Google Maps to view nearby hotels, restaurants, hospitals, and police stations.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-primary/40 bg-background/70 px-4 py-2 text-sm font-display text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Open in Google Maps
                <ExternalLink className="h-4 w-4" />
              </a>
              <span className="font-body text-sm text-foreground/75">
                {place.coordinates.lat.toFixed(4)}°N, {place.coordinates.lng.toFixed(4)}°E
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm text-foreground/80 font-body text-center">
            External map links are safer for static hosting and avoid exposing secret API keys.
          </p>
        </motion.section>

        {/* Decorative footer divider */}
        <div className="flex items-center justify-center gap-4 py-8">
          <div className="h-px flex-1 bg-gold-gradient opacity-30" />
          <span className="text-2xl text-primary">☸</span>
          <div className="h-px flex-1 bg-gold-gradient opacity-30" />
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceDetail;

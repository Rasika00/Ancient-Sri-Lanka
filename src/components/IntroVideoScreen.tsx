import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

interface IntroVideoScreenProps {
  onComplete: () => void;
}

const IntroVideoScreen = ({ onComplete }: IntroVideoScreenProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoSrc = useMemo(() => `${import.meta.env.BASE_URL}videos/intro.mp4`, []);

  const enableSound = async () => {
    if (!videoRef.current) {
      return;
    }

    setIsMuted(false);
    videoRef.current.muted = false;
    videoRef.current.volume = 1;

    try {
      await videoRef.current.play();
    } catch {
      // If browser still blocks playback, keep controls available for manual unmute.
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {videoFailed ? (
        <div className="flex h-full w-full items-center justify-center px-6 text-center">
          <div className="max-w-lg rounded-lg border border-primary/30 bg-background/85 p-8 text-foreground shadow-gold backdrop-blur-md">
            <p className="font-accent text-primary text-lg">Intro Video Missing</p>
            <h1 className="mt-2 text-3xl font-display text-gold-gradient tracking-wider">Ancient Sri Lanka</h1>
            <p className="mt-4 text-base text-foreground/80">
              Add your video file at <span className="font-semibold text-foreground">public/videos/intro.mp4</span>.
            </p>
            <button
              type="button"
              onClick={onComplete}
              className="mt-6 rounded-md bg-primary px-5 py-2 text-primary-foreground transition hover:bg-primary/90"
            >
              Continue to Site
            </button>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            muted={isMuted}
            playsInline
            controls
            onEnded={onComplete}
            onError={() => setVideoFailed(true)}
          />

          {isMuted && (
            <button
              type="button"
              onClick={enableSound}
              className="absolute right-4 top-4 rounded-md border border-primary/40 bg-background/75 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:bg-primary/20"
            >
              Enable Sound
            </button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default IntroVideoScreen;

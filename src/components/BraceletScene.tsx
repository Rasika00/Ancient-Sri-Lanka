import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, useGLTF, Center } from "@react-three/drei";
import { Suspense, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { historicalPlaces } from "@/data/places";

const modelPath = `${import.meta.env.BASE_URL}models/bracelet.glb`;

interface GemHotspotProps {
  position: [number, number, number];
  color: string;
  label: string;
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const GemHotspot = ({ position, color, onClick, isHovered, onHover }: GemHotspotProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (glowRef.current) {
      const scale = isHovered
        ? 1.8 + Math.sin(state.clock.elapsedTime * 3) * 0.3
        : 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.4 : 0.15} />
      </mesh>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(false);
          document.body.style.cursor = "default";
        }}
      >
        <octahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 2 : 0.5}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      <pointLight color={color} intensity={isHovered ? 2 : 0.5} distance={1} />
    </group>
  );
};

const BraceletModel = ({ onGemClick }: { onGemClick: (id: string) => void }) => {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredGem, setHoveredGem] = useState<number | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const { centeredScene, modelScale, radius, gemY } = useMemo(() => {
    const clonedScene = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    clonedScene.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const normalizedScale = 3 / maxDim;
    const scaledWidth = size.x * normalizedScale;
    const scaledDepth = size.z * normalizedScale;
    const braceletRadius = Math.max(scaledWidth, scaledDepth) * 0.6;

    return {
      centeredScene: clonedScene,
      modelScale: normalizedScale,
      radius: braceletRadius,
      gemY: 0,
    };
  }, [scene]);

  const gemPositions: [number, number, number][] = useMemo(
    () => {
      if (historicalPlaces.length === 2) {
        return [
          [-radius, gemY, 0],
          [radius, gemY, 0],
        ];
      }

      return historicalPlaces.map((_, i) => {
        const angle = (i / historicalPlaces.length) * Math.PI * 2 - Math.PI / 2;
        return [Math.cos(angle) * radius, gemY, Math.sin(angle) * radius];
      });
    },
    [radius, gemY]
  );

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        <Center>
          <primitive object={centeredScene} scale={modelScale} />
        </Center>

        {historicalPlaces.map((place, i) => (
          <GemHotspot
            key={place.id}
            position={gemPositions[i]}
            color={place.color}
            label={place.name}
            onClick={() => onGemClick(place.id)}
            isHovered={hoveredGem === i}
            onHover={(h) => setHoveredGem(h ? i : null)}
          />
        ))}
      </group>
    </Float>
  );
};

useGLTF.preload(modelPath);

interface BraceletSceneProps {
  onGemClick: (id: string) => void;
}

const BraceletScene = ({ onGemClick }: BraceletSceneProps) => {
  const handleGemClick = useCallback(
    (id: string) => {
      onGemClick(id);
    },
    [onGemClick]
  );

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "500px" }}>
      <Canvas
        camera={{ position: [0, 1.6, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.4} color="#FFF5E0" />
          <directionalLight position={[-4, 3, -3]} intensity={0.8} color="#C4A265" />
          <pointLight position={[0, -2, 0]} intensity={0.6} color="#FF8C00" />

          <BraceletModel onGemClick={handleGemClick} />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BraceletScene;

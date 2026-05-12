"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import type { Group } from "three";
import { Color, MathUtils } from "three";

const RING_COUNT = 5;
const RING_SPACING = 2.2;

interface Props {
  progress: MotionValue<number>;
}

export function BuildTunnel({ progress }: Readonly<Props>) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 55, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      flat
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <Scene progress={progress} />
    </Canvas>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  const groupRef = useRef<Group>(null);
  const ringRefs = useRef<Array<Group | null>>([]);

  useFrame((state) => {
    const p = progress.get();
    state.camera.position.z = MathUtils.lerp(2, -(RING_COUNT - 1) * RING_SPACING - 1, p);
    state.camera.lookAt(0, 0, -RING_COUNT * RING_SPACING);

    ringRefs.current.forEach((ring, i) => {
      if (!ring) return;
      const ringZ = -i * RING_SPACING;
      const distance = Math.abs(state.camera.position.z - ringZ);
      // Active intensity: 1 when camera is at the ring, falls off with distance.
      const active = Math.max(0, 1 - distance / RING_SPACING);
      ring.children.forEach((child) => {
        const mat = (child as unknown as { material?: { color?: Color; opacity?: number } })
          .material;
        if (mat?.color) {
          // Blend canvas-deep → accent on active.
          const accent = new Color("#08D9D6");
          const dim = new Color("#1c2944");
          mat.color.copy(dim).lerp(accent, active);
        }
        if (typeof mat?.opacity === "number") {
          mat.opacity = 0.35 + active * 0.65;
        }
      });
      ring.rotation.z = state.clock.elapsedTime * 0.15 + i * 0.6;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          position={[0, 0, -i * RING_SPACING]}
        >
          <mesh>
            <torusGeometry args={[1.1, 0.025, 8, 64]} />
            <meshBasicMaterial transparent color="#1c2944" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

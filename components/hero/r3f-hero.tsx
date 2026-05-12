"use client";
import { Canvas } from "@react-three/fiber";
import { FlowFieldPlane } from "./flow-field-plane";

export function R3FHero() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], near: 0, far: 2, zoom: 1 }}
      gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      flat
      style={{ position: "absolute", inset: 0 }}
    >
      <FlowFieldPlane />
    </Canvas>
  );
}

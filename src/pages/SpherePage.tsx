import { a } from "@react-spring/three";
import { useSpring } from "@react-spring/core";
import {
  ContactShadows,
  Environment,
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import * as THREE from "three";

const SphereBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #202020;
`;

const SpherePage = () => {
  const [{ background, fill }, set] = useSpring(
    { background: "#f0f0f0", fill: "#202020" },
    []
  );

  return (
    <SphereBox>
      <Canvas dpr={[1, 2]}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Scene setBg={set} />
      </Canvas>
    </SphereBox>
  );
};

export default SpherePage;

const Scene = ({ setBg }: any) => {
  const sphere = useRef<any>();
  const light = useRef<any>();
  const [mode, setMode] = useState(false);
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    light.current.position.x = state.mouse.x * 20;
    light.current.position.y = state.mouse.y * 20;
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(
        sphere.current.position.x,
        hovered ? state.mouse.x / 2 : 0,
        0.2
      );
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 +
          (hovered ? state.mouse.y / 2 : 0),
        0.2
      );
    }
  });

  const AnimatedMaterial: any = a(MeshDistortMaterial);

  const [{ wobble, coat, color, ambient, env }] = useSpring(
    () => ({
      wobble: down ? 1.2 : hovered ? 1.05 : 1,
      coat: mode && !hovered ? 0.04 : 1,
      ambient: mode && !hovered ? 1.5 : 0.5,
      env: mode && !hovered ? 0.4 : 1,
      //   color: mode ? "#E8B059" : "#202020",
      color: hovered ? "#E8B059" : mode ? "#202020" : "white",
      config: (n) =>
        n === "wobble" && hovered && { mass: 2, tension: 1000, friction: 10 },
    }),
    [mode, hovered, down]
  );

  return (
    <>
      <PerspectiveCamera position={[0, 0, 0]} fov={0}>
        <a.ambientLight intensity={ambient} />
        <a.pointLight
          ref={light}
          position-z={-15}
          intensity={env}
          color="#F8C069"
        />
      </PerspectiveCamera>
      <a.mesh
        ref={sphere}
        scale={wobble}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setDown(true)}
        onPointerUp={() => {
          setDown(false);
          setMode(!mode);
          setBg({
            background: !mode ? "#202020" : "#f0f0f0",
            fill: !mode ? "#f0f0f0" : "#202020",
          });
        }}>
        <sphereGeometry args={[1, 64, 64]} />
        <AnimatedMaterial
          color={color}
          envMapIntensity={env}
          clearcoat={coat}
          clearcoatRoughness={0}
          metalness={0.1}
        />
        {/* <meshPhysicalMaterial
          color="#202020"
          transparent
          metalness={0.1}
          clearcoatRoughness={0}
          clearcoat={0.1}
        /> */}
      </a.mesh>
      <Environment preset="warehouse" />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1.6, 0]}
        opacity={mode ? 0.8 : 0.4}
        width={15}
        height={15}
        blur={2.5}
        far={1.6}
      />
    </>
  );
};

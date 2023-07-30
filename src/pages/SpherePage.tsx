import { a } from "@react-spring/three";
import { a as animation } from "@react-spring/web";
import { useSpring } from "@react-spring/core";
import {
  ContactShadows,
  Environment,
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import * as THREE from "three";

const SphereBox = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 390px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Overlay = styled.div`
  display: flex;
  order: 1;
  flex: 1;
  pointer-events: none;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  max-width: 600px;
  h1 {
    font-size: 40px;
    font-weight: 700;
    color: #e8b059;
  }
  span {
    font-size: 35px;
    font-weight: 700;
  }
`;

const SpherePage = () => {
  const [{ background, color }, set] = useSpring(
    { background: "#f0f0f0", color: "#202020" },
    []
  );

  return (
    <animation.section style={{ background }}>
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
        <Overlay>
          <h1>The Invocation —</h1>
          <animation.span style={{ color }}>
            Behold the sign and the very Hallowed Names of God full of power.
            Obey the power of this our pentacle
          </animation.span>
        </Overlay>
      </SphereBox>
    </animation.section>
  );
};

export default SpherePage;

const Scene = ({ setBg }: any) => {
  const sphere = useRef<any>();
  const light = useRef<any>();
  const [mode, setMode] = useState(false);
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "none" : "default";
  }, [hovered]);

  useFrame(({ mouse, clock }) => {
    light.current.position.x = mouse.x * 20;
    light.current.position.y = mouse.y * 20;
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(
        sphere.current.position.x,
        hovered ? mouse.x / 2 : 0,
        0.2
      );
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(clock.elapsedTime / 1.5) / 6 + (hovered ? mouse.y / 2 : 0),
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
            color: !mode ? "#f0f0f0" : "#202020",
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

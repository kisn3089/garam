import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  Html,
  OrbitControls,
  ScrollControls,
  Text,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import { VenomBox } from "./styles";
import React, { useRef, useState } from "react";
import { Vector3 } from "three";

const Venom = () => {
  const venomRef = useRef<any>();
  const { nodes, materials }: any = useGLTF("/model/scene.gltf");
  // const gltf = useLoader(GLTFLoader, "/src/assets/scene.gltf");

  // const scroll = useScroll();

  return (
    <VenomBox>
      <Canvas
        shadows
        camera={{ position: [-1, 0, 30], fov: 35, near: 1, far: 50 }}
        style={{ backgroundColor: "#242424" }}>
        <directionalLight position={[0, 20, 0]} color="#fff" intensity={50} />
        <ambientLight intensity={2} />
        <Input />
        {/* <ScrollControls pages={3} damping={0.25}> */}
        <group dispose={null}>
          <group scale={0.02}>
            <primitive object={nodes.GLTF_created_0_rootJoint} />
            <skinnedMesh
              geometry={nodes.Object_7.geometry}
              material={materials["Body.001"]}
              skeleton={nodes.Object_7.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_8.geometry}
              material={materials["Head.001"]}
              skeleton={nodes.Object_8.skeleton}
            />
          </group>
        </group>
        {/* </ScrollControls> */}
        {/* <OrbitControls enableZoom={false} /> */}
        <CanvasEffect venomRef={venomRef} />
      </Canvas>
    </VenomBox>
  );
};

export default Venom;

const CanvasEffect = ({ venomRef }: any) => {
  const vec = new Vector3();

  return useFrame(({ camera, mouse }) => {
    vec.set(mouse.x * 20, mouse.y * 20, camera.position.z);
    // venomRef.current.rotation.y += 0.01;
    camera.position.lerp(vec, 0.025);
    camera.lookAt(0, 0, 0);
  });
};

const Input = () => {
  const [text, set] = useState("I'm Vennom");
  return (
    <group scale={2} position={[0.4, 0.25, -1]}>
      <Text position={[0, -0.022, 0]} fontSize={0.335} letterSpacing={-0.0}>
        {text}
        <meshStandardMaterial color="#ddd" />
      </Text>
      <mesh position={[0, -0.022, 0]} scale={[2.5, 0.48, 1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <Html transform>
        <ControlledInput
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            set(e.target.value)
          }
          value={text}
        />
      </Html>
    </group>
  );
};

const ControlledInput = (props: {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { value, handleChange } = props;
  return <input type="text" value={value} onChange={handleChange} />;
};

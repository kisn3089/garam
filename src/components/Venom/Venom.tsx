import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Center, OrbitControls } from '@react-three/drei';
import { VenomBox } from './styles';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Color, MathUtils, Vector3 } from 'three';

const Venom = () => {
  const venomRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, '/src/assets/scene.gltf');

  return (
    <VenomBox>
      <Canvas
        shadows
        camera={{ position: [-1, 0, 30], fov: 35, near: 1, far: 50 }}
        style={{ backgroundColor: '#242424' }}>
        <directionalLight position={[0, 20, 0]} color="#fff" intensity={50} />
        <ambientLight intensity={2} />
        <Center>
          {[...Array(5).keys()].map((x) =>
            [...Array(3).keys()].map((y) => (
              <Button key={x + y * 5} position={[x * 2.5, y * 2.5, 0]} />
            ))
          )}
        </Center>
        <primitive
          ref={venomRef}
          object={gltf.scene}
          scale={3}
          position={[0, -1, 1]}
          castShadow
          receiveShadow
        />
        {/* <OrbitControls /> */}
        <CanvasEffect venomRef={venomRef} />
      </Canvas>
    </VenomBox>
  );
};

export default Venom;

const CanvasEffect = ({ venomRef }: any) => {
  const vec = new Vector3();
  // const [y, setY] = useState(0);
  // useEffect(() => {
  //   const scrollReponse = () => {
  //     if (window.scrollY >= 50) setY(2);
  //   };
  //   window.addEventListener('scroll', scrollReponse);
  //   return () => window.removeEventListener('scroll', scrollReponse);
  // }, []);

  return useFrame(({ camera, mouse }) => {
    vec.set(mouse.x * 20, mouse.y * 20, camera.position.z);
    venomRef.current.rotation.y += 0.01;
    camera.position.lerp(vec, 0.05);
    camera.lookAt(0, 0, 0);
  });
};

const black = new Color('black');
function Button(props: any) {
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const colorTo = useMemo(
    () => new Color(Math.floor(Math.random() * 16777216)),
    []
  );

  useFrame(() => {
    ref.current.rotation.x = hovered
      ? MathUtils.lerp(ref.current.rotation.x, -Math.PI * 2, 0.025)
      : MathUtils.lerp(ref.current.rotation.x, 0, 0.025);

    ref.current.position.z = selected
      ? MathUtils.lerp(ref.current.position.z, -2, 0.025)
      : MathUtils.lerp(ref.current.position.z, -5, 0.025);

    ref.current.material.color.lerp(selected ? colorTo : black, 0.025);
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setSelected(!selected);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}>
      <icosahedronGeometry />
      <meshPhysicalMaterial
        roughness={0}
        metalness={0}
        thickness={3.12}
        ior={1.74}
        transmission={1.0}
      />
    </mesh>
  );
}

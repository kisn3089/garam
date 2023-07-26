import { useLoader } from '@react-three/fiber';
import React from 'react';
import GLTFLoader from 'three-gltf-loader';

const Venom = () => {
  const loader = new GLTFLoader();
  loader.load('./src/assets/scene.gltf', (gltf) => {
    // scene.add(gltf.scene);
  });
  return <div>Venom</div>;
};

export default Venom;

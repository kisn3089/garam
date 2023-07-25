import { Box, OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';

const Snow = () => {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', backgroundColor: '#242424' }}>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        enableDamping={true}
        zoomSpeed={1}
        panSpeed={1}
        rotateSpeed={1}
      />
      <ambientLight intensity={0.5} />
      <Stars depth={20} fade={true} factor={10} saturation={0} />
      {/* <Box /> */}
      <pointLight position={[5, 5, 5]} intensity={5} />
    </Canvas>
  );
};

export default Snow;

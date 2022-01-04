import React, { useState } from "react";
import { VRCanvas, Interactive, DefaultXRControllers } from "@react-three/xr";
import { Sky, useFBX, Text, OrbitControls } from "@react-three/drei";
import "@react-three/fiber";
import { Suspense } from "react";
import "./styles.css";

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[40, 40]} />
      <meshStandardMaterial attach="material" color="#666" />
    </mesh>
  );
}

function Box({ color, size, scale, children, ...rest }) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshPhongMaterial attach="material" color={color} />
      {children}
    </mesh>
  );
}

const Scene = () => {
  const fbx = useFBX("black.fbx");

  return <primitive object={fbx} scale={0.005} />;
};

function Button(props) {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(0x123456);

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
  };

  return (
    <Interactive
      onSelect={onSelect}
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {/* <Scene /> */}
      <OrbitControls />
      <Box
        color={color}
        scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        size={[0, 0, 0]}
        {...props}
      >
        {/* <Text
          position={[0, 0, 0.06]}
          fontSize={0.05}
          color="#000"
          anchorX="center"
          anchorY="middle"
        >
          Hello react-xr!
        </Text> */}
        <Scene />
      </Box>
    </Interactive>
  );
}

export default function App() {
  return (
    <VRCanvas>
      <Suspense fallback={null}>
        <OrbitControls />
        <Sky sunPosition={[0, 1, 0]} />
        <Floor />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <DefaultXRControllers />
        <Button position={[0, 0.8, -1]} />
      </Suspense>
    </VRCanvas>
  );
}

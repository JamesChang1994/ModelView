import React, { useState } from "react";
import {
  ARCanvas,
  VRCanvas,
  Interactive,
  DefaultXRControllers,
} from "@react-three/xr";
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

function VButton(props) {
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
      <OrbitControls />
      <Box
        color={color}
        scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        size={[0, 0, 0]}
        {...props}
      >
        <Scene />
      </Box>
    </Interactive>
  );
}

function RButton(props) {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState < any > "blue";

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
  };

  return (
    <Interactive
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
      onSelect={onSelect}
    >
      <Box
        color={color}
        scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]}
        size={[0, 0, 0]}
        {...props}
      >
        <Scene />
      </Box>
    </Interactive>
  );
}

export default function App() {
  return (
    <>
      <VRCanvas>
        <Suspense fallback={null}>
          <OrbitControls />
          <Sky sunPosition={[0, 1, 0]} />
          <Floor />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <VButton position={[0, 0.8, -1]} />
          <DefaultXRControllers />
        </Suspense>
      </VRCanvas>
      <ARCanvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Button position={[0, 0.1, -0.2]} />
        <DefaultXRControllers />
      </ARCanvas>
    </>
  );
}

import { Canvas } from "@react-three/fiber";
import { Fragment, Suspense } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import Shoe from "./Shoe";
import ColorPicker from "./ColorPicker";

function App() {
  return (
    <Fragment>
      <ColorPicker />
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.3} position={[5, 20, 20]} />
        <OrbitControls />
        <Suspense>
          <Shoe />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.45}
            scale={10}
            blur={1.5}
            far={0.8}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </Fragment>
  );
}

export default App;

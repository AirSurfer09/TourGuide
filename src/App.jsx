import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Experience } from './components/Experience';
import { useRef } from 'react';
import { Loader, OrbitControls } from '@react-three/drei';
import { useZustStore } from './hooks/useStore';
function App() {
  const heroRef = useRef();
  const actions = useZustStore((state) => state.actions);
  actions.updateHeroRef(heroRef);
  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 75 }}
        onCreated={() => {
          actions.loadNavMesh('/loki_hall/loki_navigation.glb');
        }}
      >
        <Physics>
          <Experience heroRef={heroRef} />
        </Physics>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;

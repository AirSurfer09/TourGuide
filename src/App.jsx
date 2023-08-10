import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Experience } from "./components/Experience";
import { Suspense, useRef } from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { useZustStore } from "./hooks/useStore";
import ChatBubble from "./chat";
function App() {
  const heroRef = useRef();
  const actions = useZustStore((state) => state.actions);
  const clientState = useZustStore((state) => state.clientState);
  actions.updateHeroRef(heroRef);
  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          camera={{
            position: [0.010386942885816097, 1, 11.713516738956264],
            fov: 75,
          }}
          onCreated={() => {
            actions.loadNavMesh("/loki_hall/loki_navigation.glb");
          }}
        >
          <Physics>
            <Experience heroRef={heroRef} />
          </Physics>
        </Canvas>
      </Suspense>
      <Loader />
      {clientState ? (
        <ChatBubble
          chatHistory={"Hide"}
          chatUiVariant={"Toggle History Chat"}
          client={clientState}
        />
      ) : null}
    </>
  );
}

export default App;

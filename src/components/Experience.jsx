import { RigidBody } from "@react-three/rapier";
import { Manager } from "../hooks/useYuka";
import { YukaMesh } from "./Yuka/YukaMesh";
import { LokiPlatform } from "./LokiPlatform";
import { CharacterController } from "./CharacterController/CharacterController";
import { MayaNpc } from "./Npcs";

export const Experience = ({ heroRef }) => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 20, 20]} intensity={1} />
      <Manager>
        <CharacterController reference={heroRef} />
        <MayaNpc name={"Maya"} position={[0, 0, -2]} heroRef={heroRef} />
        {/* <YukaMesh /> */}
        <group>
          <RigidBody friction={2} colliders="trimesh" type="fixed">
            <LokiPlatform />
          </RigidBody>
        </group>
      </Manager>
    </>
  );
};

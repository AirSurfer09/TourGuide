/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 ./public/loki_hall/loki_env.glb 
Author: Elin (https://sketchfab.com/ElinHohler)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/loki-time-variance-authority-court-baked-af263a18b9784c8481350e4cd3bdc74a
Title: Loki - Time Variance Authority court (BAKED)
*/

import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function LokiPlatform(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/loki_hall/loki_env.glb');
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Cutouts_1"
                position={[9.509, 0.042, -6.926]}
                rotation={[Math.PI / 2, 0, 1.042]}
              >
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials.Cutouts}
                />
              </group>
              <group
                name="Cutouts001_2"
                position={[-9.379, 0.042, -9.083]}
                rotation={[Math.PI / 2, 0, -0.898]}
              >
                <mesh
                  name="Object_8"
                  geometry={nodes.Object_8.geometry}
                  material={materials.Cutouts}
                />
              </group>
              <group
                name="Cutouts002_3"
                position={[-0.031, 0.042, 18.797]}
                rotation={[Math.PI / 2, 0, Math.PI]}
              >
                <mesh
                  name="Object_10"
                  geometry={nodes.Object_10.geometry}
                  material={materials.Cutouts}
                />
              </group>
              <group
                name="Bench_0"
                position={[-2.008, 0, 2.937]}
                rotation={[0, -Math.PI / 2, 0]}
              >
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.Bench}
                />
              </group>
              <group name="Door_4" position={[0, 2.133, 14.718]}>
                <mesh
                  name="Object_12"
                  geometry={nodes.Object_12.geometry}
                  material={materials.Door}
                />
                <mesh
                  name="Object_13"
                  geometry={nodes.Object_13.geometry}
                  material={materials.EmissiveYellow}
                />
              </group>
              <group name="Floor_5" position={[0, 0, 3.996]}>
                <mesh
                  name="Object_15"
                  geometry={nodes.Object_15.geometry}
                  material={materials.Floor}
                />
              </group>
              <group name="Glass_6">
                <mesh
                  name="Object_17"
                  geometry={nodes.Object_17.geometry}
                  material={materials.Glass}
                />
              </group>
              <group name="Lamp_7" position={[1.043, 1.587, 14.554]}>
                <mesh
                  name="Object_19"
                  geometry={nodes.Object_19.geometry}
                  material={materials.Lamp}
                />
                <mesh
                  name="Object_20"
                  geometry={nodes.Object_20.geometry}
                  material={materials.EmissiveYellow}
                />
              </group>
              <group name="Metall_8">
                <mesh
                  name="Object_22"
                  geometry={nodes.Object_22.geometry}
                  material={materials.Podest}
                />
              </group>
              <group
                name="Neon_9"
                position={[-10.382, 3.315, -2.826]}
                rotation={[0, -Math.PI / 2, 0]}
              >
                <mesh
                  name="Object_24"
                  geometry={nodes.Object_24.geometry}
                  material={materials.Neon}
                />
              </group>
              <group
                name="PicturesBaked001_10"
                position={[-5.718, 2.474, 5.747]}
              >
                <mesh
                  name="Object_26"
                  geometry={nodes.Object_26.geometry}
                  material={materials.Pictures}
                />
              </group>
              <group name="Pult_11" position={[0, 1.714, -4.788]}>
                <mesh
                  name="Object_28"
                  geometry={nodes.Object_28.geometry}
                  material={materials.Pult}
                />
              </group>
              <group name="TimeKeepersWall_12" position={[0, 4.955, 6.607]}>
                <mesh
                  name="Object_30"
                  geometry={nodes.Object_30.geometry}
                  material={materials.TimeKeeperWall}
                />
              </group>
              <group
                name="TVA_Logo_13"
                position={[0, 0.957, -4.625]}
                rotation={[1.513, 0, 0]}
              >
                <mesh
                  name="Object_32"
                  geometry={nodes.Object_32.geometry}
                  material={materials.TVA_Logo}
                />
              </group>
              <group name="WallsBaked_14" position={[0, 4.955, 6.607]}>
                <mesh
                  name="Object_34"
                  geometry={nodes.Object_34.geometry}
                  material={materials.WallsBaked}
                />
                <mesh
                  name="Object_35"
                  geometry={nodes.Object_35.geometry}
                  material={materials.EmissiveBlue}
                />
                <mesh
                  name="Object_36"
                  geometry={nodes.Object_36.geometry}
                  material={materials.EmissiveYellow}
                />
              </group>
              <group name="WoodFrame_15" position={[5.725, 4.248, -1.022]}>
                <mesh
                  name="Object_38"
                  geometry={nodes.Object_38.geometry}
                  material={materials.TimeKeeperWall}
                />
              </group>
              <group
                name="LokiAkte_16"
                position={[-0.17, 1.874, -5.065]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={0.377}
              >
                <mesh
                  name="Object_40"
                  geometry={nodes.Object_40.geometry}
                  material={materials.LokiAkte}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/loki_hall/loki_env.glb');
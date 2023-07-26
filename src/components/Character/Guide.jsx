/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 .\public\guide\guide.glb 
*/

import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { phonemesGenerator } from '../../helpers/phonemesGenerator';
import { useFrame } from '@react-three/fiber';

export function Guide(props) {
  const visemes = useRef([]);
  let currentViseme = 'viseme_sil';
  let prevViseme = currentViseme;
  const [time, setTime] = useState(0);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (props.talking) {
      const tem = phonemesGenerator(props.textChunk);
      for (let k = 0; k < tem.length; k++)
        for (let l = 0; l < tem[k].length; l++)
          visemes.current.push(`viseme_${tem[k][l]}`);
    }
  }, [props.textChunk]);

  const { nodes, materials } = useGLTF('/guide/guide.glb');
  useFrame((state, _delta) => {
    if (props.talking === false) {
      for (let i1 = 0; i1 < visemes.current.length; i1++) {
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[visemes.current[i]]
        ] = 0;
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary[visemes.current[i]]
        ] = 0;
      }
    }
    if (time % 8 === 0 && props.talking) {
      if (i > 0) {
        prevViseme = visemes.current[i - 1];
      }
      currentViseme = visemes.current[i];

      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary[prevViseme]
      ] = 0;
      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary[prevViseme]
      ] = 0;
      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary[currentViseme]
      ] = 1;
      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary[currentViseme]
      ] = 1;
      if (i < visemes.current.length) {
        setI(i + 1);
      }
    }
    if (props.talking) {
      setTime(time + 1);
    }
  });
  return (
    <group ref={props.reference} {...props} dispose={null}>
      <group rotation-x={-Math.PI / 2}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/guide/guide.glb');
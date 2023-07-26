import { useAnimations, useFBX } from '@react-three/drei';
import { useYuka } from '../hooks/useYuka';
import { CustomPerson } from './Yuka/CustomPerson';
import { useEffect, useRef } from 'react';
import { useZustStore } from '../hooks/useStore';
import { useConvaiClient } from '../hooks/useConvaiClient';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Guide } from './Character/Guide';
import { phonemesGenerator } from '../helpers/phonemesGenerator';

const MIN_DISTANCE = 8;

const MayaNpc = ({ name, position, heroRef }) => {
  const {
    isProximity,
    setIsProximity,
    talking,
    keyPressed,
    handleTPress,
    handleTRelease,
    npcText,
    npcTextRef,
    textChunk,
  } = useConvaiClient({
    _apiKey: import.meta.env['VITE_CONVAI_APIKEY'],
    _characterId: import.meta.env['VITE_GUIDE'],
  });
  const [actionState, updateActionState] = useZustStore((state) => [
    state?.actionState,
    state.actions.updateActionState,
  ]);
  const [ref] = useYuka({
    type: CustomPerson,
    energy: 15,
    name: name,
    position: position,
  });
  const { animations: standingAnimation } = useFBX('animations/Standing.fbx');
  const { animations: walkingAnimation } = useFBX('animations/Walking.fbx');
  const { animations: talkingAnimation } = useFBX('animations/Talking.fbx');
  const { animations: listeningAnimation } = useFBX('animations/Listening.fbx');
  walkingAnimation[0].name = 'walking';
  standingAnimation[0].name = 'idle';
  talkingAnimation[0].name = 'talking';
  listeningAnimation[0].name = 'listening';
  const { actions } = useAnimations(
    [
      standingAnimation[0],
      walkingAnimation[0],
      talkingAnimation[0],
      listeningAnimation[0],
    ],
    ref
  );
  useEffect(() => {
    // if(actionState.Maya)
    actions[actionState.Maya]?.reset().fadeIn(1).play();
    return () => {
      actions[actionState.Maya]?.reset().fadeOut(1);
    };
  }, [actionState?.Maya]);

  useEffect(() => {
    if (isProximity) {
      if (talking) {
        if (actionState?.Maya !== 'walking') updateActionState.Maya('talking');
      } else {
        updateActionState.Maya('listening');
      }

      window.addEventListener('keydown', handleTPress);
      window.addEventListener('keyup', handleTRelease);
      return () => {
        window.removeEventListener('keydown', handleTPress);
        window.removeEventListener('keyup', handleTRelease);
      };
    }
  }, [isProximity, keyPressed, talking]);

  useFrame((state, delta) => {
    const camera = state.camera;

    const mayaWorldPosition = ref.current.getWorldPosition(new THREE.Vector3());
    let distance = camera.position.distanceTo(mayaWorldPosition);
    if (isProximity) {
      const heroWorldPosition = heroRef.current.getWorldPosition(
        new THREE.Vector3()
      );
      ref.current.lookAt(heroWorldPosition);
      if (distance > MIN_DISTANCE) {
        setIsProximity(false);
        updateActionState.Maya('idle');
      }
    }

    if (distance < MIN_DISTANCE) {
      setIsProximity(true);
    }
  });

  return (
    <group>
      <Guide talking={talking} textChunk={textChunk} reference={ref} />
    </group>
  );
};
export { MayaNpc };

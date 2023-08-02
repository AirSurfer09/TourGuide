import { useAnimations, useFBX } from '@react-three/drei';
import { useYuka } from '../hooks/useYuka';
import { CustomPerson } from './Yuka/CustomPerson';
import { useEffect, useRef } from 'react';
import { useZustStore } from '../hooks/useStore';
import { useConvaiClient } from '../hooks/useConvaiClient';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Guide } from './Character/Guide';
import { useMachine } from '@xstate/react';
import { tour } from '../machine/tourState';

const MIN_DISTANCE = 8;

const MayaNpc = ({ name, position, heroRef }) => {
  const [xState, xTransition] = useMachine(tour);
  const {
    isProximity,
    setIsProximity,
    talking,
    keyPressed,
    handleTPress,
    handleTRelease,
    textChunk,
    convaiClient,
    setTalking,
    activeTour,
    setActiveTour,
  } = useConvaiClient({
    _apiKey: import.meta.env['VITE_CONVAI_APIKEY'],
    _characterId: import.meta.env['VITE_GUIDE'],
    _xState: xState,
    _xTransition: xTransition,
  });
  const [actionState, updateActionState, gState] = useZustStore((state) => [
    state?.actionState,
    state.actions.updateActionState,
    state.gState,
  ]);
  const [ref] = useYuka({
    type: CustomPerson,
    energy: 15,
    name: name,
    position: position,
  });
  const { animations: standingAnimation } = useFBX('animations/Standing.fbx');
  const { animations: walkingAnimation } = useFBX('animations/Walking.fbx');
  const { animations: talkingAnimation } = useFBX(
    'animations/TalkingFemale.fbx'
  );
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

    // xState Code
    if (isProximity) {
      if (xState.value === 'Waiting') xTransition('START');
      convaiClient.current.onAudioPlay(() => {
        setTalking(true);
        console.log('onAudioPlay');
        if (xState.value === 'AnyQuestions') {
          setActiveTour(true);
        }
      });

      convaiClient.current.onAudioStop(() => {
        setTalking(false);
        // setActiveTour(true);
        console.log('onAudioStop');
        if (xState.value.Welcome === 'WelcomeGreeting') {
          xTransition('Done');
        } else if (xState.value.Welcome === 'ExplainStatues') {
          xTransition('Done2');
        } else if (xState.value.Welcome === 'WallPainting') {
          xTransition('Walks');
        } else if (xState.value.WallPainting === 'Rotate') {
          xTransition('Done');
        } else if (xState.value.WallPainting === 'Exit') {
          xTransition('Done');
        }
      });

      if (xState.value === 'AnyQuestions') {
        console.log(activeTour);
      } else if (
        xState.value.Welcome === 'WalkingState' &&
        gState === 'Reached'
      ) {
        xTransition('Reached');
        updateActionState.Maya('listening');
      } else if (
        xState.value.Welcome === 'WalkingState' &&
        gState === 'Centroid1'
      ) {
        updateActionState.Maya('walking');
      }
    }
  });

  useEffect(() => {
    console.log(xState.value);
    if (xState.value.Welcome === 'WelcomeGreeting') {
      convaiClient?.current?.sendTextChunk(
        'Introduce Yourself and greet the user'
      );
    } else if (xState.value.Welcome === 'ExplainStatues') {
      convaiClient?.current?.sendTextChunk(
        'tell me about the three statues behind you'
      );
    } else if (xState.value === 'AnyQuestions') {
      convaiClient?.current?.sendTextChunk(
        'Ask the user if they have any questions'
      );
    } else if (xState.value === 'Condition') {
      if (activeTour) {
        xTransition('Yes');
      } else {
        xTransition('No');
      }
    } else if (xState.value.Welcome === 'WallPainting') {
      convaiClient?.current?.sendTextChunk(
        'Tell me that we are moving towards the glory wall'
      );
    } else if (xState.value.WallPainting === 'Rotate') {
      convaiClient?.current?.sendTextChunk(
        'Explain me about the wall paintings and its history'
      );
    } else if (xState.value.WallPainting === 'Exit') {
      convaiClient?.current?.sendTextChunk(
        'Now tell me where these chairs in between'
      );
    } else if (xState.value === 'Conclude') {
      convaiClient?.current?.sendTextChunk(
        'Conclude the tour and tell me to ask questions'
      );
    }
  }, [xState.value]);
  return (
    <group>
      <Guide talking={talking} textChunk={textChunk} reference={ref} />
    </group>
  );
};
export { MayaNpc };

import { useFrame } from '@react-three/fiber';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { EntityManager, FollowPathBehavior, Vector3 } from 'yuka';
import { useZustStore } from './useStore';
import * as THREE from 'three';
const mgrContext = createContext();

// entity manager

export const Manager = ({ children }) => {
  const [mgr] = useState(() => new EntityManager(), []);
  const [
    actionState,
    navMesh,
    heroRef,
    updateActionState,
    gState,
    updateGState,
  ] = useZustStore((state) => [
    state.actionState,
    state.navMesh,
    state.heroRef,
    state.actions.updateActionState,
    state.gState,
    state.updateGState,
  ]);
  useEffect(() => {
    if (!navMesh) {
      return;
    }

    mgr.entities.forEach((entity) => {
      const followPathBehavior = new FollowPathBehavior();
      followPathBehavior.nextWaypointDistance = 0.1;
      followPathBehavior.active = false;
      entity.steering.add(followPathBehavior);
    });
  }, [navMesh, mgr.entities]);

  const point1 = new Vector3(
    -4.048896467221584,
    0.07689154148101807,
    1.3379009354136726
  );
  const point2 = new Vector3(
    1.1506193623478698,
    0.07689154148101807,
    10.658949522017657
  );
  const centriod1 = new Vector3(
    -4.459091782569885,
    0.20000000298023224,
    1.968663215637207
  );
  const findNextPath = (_delta) => {
    mgr.entities.forEach((entity) => {
      const followPathBehavior = entity.steering.behaviors[0];
      const nextRegion = entity.navMesh.getClosestRegion(point1);
      if (actionState[entity.name] === 'walking') {
        if (
          JSON.stringify(entity.currentRegion.centroid) ===
          JSON.stringify(centriod1)
        ) {
          // rest code goes here
          updateGState('Reached');
          updateActionState.Maya('idle');
        }
        entity.maxForce = 3;
        entity.maxSpeed = 3;
        entity.fromRegion = entity.currentRegion;
        entity.toRegion = nextRegion;
        const from = entity.position;
        const to = entity.toRegion.centroid;
        followPathBehavior.path.clear();
        const path = entity.navMesh.findPath(from, to);
        followPathBehavior.active = true;
        for (const point of path) {
          followPathBehavior.path.add(point, 0.5);
        }
      } else if (actionState[entity.name] === 'talking') {
        // stops the entity and increases the energy slower
        if (heroRef.current) {
          const heroWorldPosition = heroRef.current.getWorldPosition(
            new THREE.Vector3()
          );
          entity.rotateTo(heroWorldPosition, _delta * 5, 0);
        }
      } else if (actionState[entity.name] === 'listening') {
        if (heroRef.current) {
          const heroWorldPosition = heroRef.current.getWorldPosition(
            new THREE.Vector3()
          );
          entity.rotateTo(heroWorldPosition, _delta * 5);
        }
      } else if (actionState[entity.name] === 'idle') {
        entity.maxForce = 0;
        entity.maxSpeed = 0;
        followPathBehavior.active = false;
        followPathBehavior.path.clear();
      }
    });
  };

  useFrame((state, _delta) => {
    mgr.update(_delta);

    findNextPath(_delta);
  });

  return <mgrContext.Provider value={mgr}>{children}</mgrContext.Provider>;
};

//reusable yuka hook

export const useYuka = ({ type, position, name, energy }) => {
  const ref = useRef();
  const mgr = useContext(mgrContext);
  const [entity] = useState(() => new type(energy));
  const navMesh = useZustStore((state) => state.navMesh);
  useEffect(() => {
    entity.position.set(...position);
    entity.name = name;
    entity.navMesh = navMesh;
    entity.setRenderComponent(ref, (entity) => {
      ref.current.position.copy(entity.position);
      ref.current.quaternion.copy(entity.rotation);
    });
    mgr.add(entity);
    return () => mgr.remove(entity);
  }, []);
  return [ref, entity];
};

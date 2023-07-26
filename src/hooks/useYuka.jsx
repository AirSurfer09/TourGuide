import { useFrame } from '@react-three/fiber';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { EntityManager, FollowPathBehavior, Vector3 } from 'yuka';
import { useZustStore } from './useStore';
import * as THREE from 'three';
const mgrContext = createContext();

// entity manager

export const Manager = ({ children }) => {
  const [mgr] = useState(() => new EntityManager(), []);
  const [actionState, navMesh, heroRef, present] = useZustStore((state) => [
    state.actionState,
    state.navMesh,
    state.heroRef,
    state.present,
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
  const findNextPath = (_delta) => {
    mgr.entities.forEach((entity) => {
      const followPathBehavior = entity.steering.behaviors[0];
      if (actionState[entity.name] === 'walking') {
        let nextRegion;
        if (present === 1) {
          nextRegion = entity.navMesh.getClosestRegion(point1);
          console.log(nextRegion, 'NR');
        } else if (present === 2) {
          nextRegion = entity.navMesh.getClosestRegion(point2);
        }
        if (nextRegion !== entity.currentRegion) {
          entity.maxForce = 1;
          entity.maxSpeed = 2;
          entity.fromRegion = entity.currentRegion;
          entity.toRegion = nextRegion;
          const from = entity.position;
          const to = entity.toRegion.centroid;
          followPathBehavior.path.clear();
          const path = entity.navMesh.findPath(from, to);
          followPathBehavior.active = true;
          for (const point of path) {
            followPathBehavior.path.add(point, 0.5);
            // entity.rotateTo(point, _delta * 5);
          }
        }
      } else if (actionState[entity.name] === 'talking') {
        // stops the entity and increases the energy slower
        if (heroRef.current) {
          const heroWorldPosition = heroRef.current.getWorldPosition(
            new THREE.Vector3()
          );
          entity.rotateTo(heroWorldPosition, _delta * 5);
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

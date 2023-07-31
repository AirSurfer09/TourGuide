import { NavMeshLoader } from 'yuka';
import { create } from 'zustand';
import * as THREE from 'three';
import { createConvexRegionHelper } from '../helpers/createConvexRegionHelper';
export const useZustStore = create((set, get) => {

  return {
    navMesh: null,
    heroRef: null,
    zeroCoord: {
      x: 0,
      y: 0,
      z: -2,
    },
    firstCoord: {
      x: -4.048896467221584,
      y: 0.07689154148101807,
      z: 1.3379009354136726,
    },

    secondCoord: {
      x: 1.1506193623478698,
      y: 0.07689154148101807,
      z: 10.658949522017657,
    },
    present: -1,
    refs: {
      level: null,
    },
    actionState: {
      Maya: 'idle',
    },
    level: {
      geometry: new THREE.BufferGeometry(),
      material: new THREE.MeshBasicMaterial(),
    },
    actions: {
      loadNavMesh(url) {
        const loader = new NavMeshLoader();
        loader.load(url).then((navMesh) => {
          const { geometry, material } = createConvexRegionHelper(navMesh);
          set({ navMesh });
          set({ level: { geometry, material } });
        });
      },

      updatePresent: (current) => {
        set({ present: current });
      },
      updateHeroRef(reference) {
        set({ heroRef: reference });
      },
      updateActionState: {
        Maya: (action) =>
          set((state) => ({
            actionState: {
              ...state.actionState,
              Maya: action,
            },
          })),
      },
    },
  };
});

import { NavMeshLoader } from "yuka";
import { create } from "zustand";
import * as THREE from "three";
import { createConvexRegionHelper } from "../helpers/createConvexRegionHelper";
export const useZustStore = create((set, get) => {
  return {
    navMesh: null,
    heroRef: null,
    gState: "Centroid1",
    updateGState: (xState) => {
      set({
        gState: xState,
      });
    },
    clientState: null,
    updateClient: (_client) => {
      set({
        clientState: _client,
      });
    },
    refs: {
      level: null,
    },
    actionState: {
      Maya: "idle",
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

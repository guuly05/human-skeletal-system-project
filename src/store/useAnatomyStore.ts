import { create } from 'zustand';
import type { SystemId } from '../data/anatomy';

type AnatomyState = {
  activeSystems: Record<SystemId, boolean>;
  selectedPartId: string;
  heartRate: number;
  breathingRate: number;
  simulationRunning: boolean;
  selectPart: (id: string) => void;
  toggleSystem: (id: SystemId) => void;
  setHeartRate: (value: number) => void;
  setBreathingRate: (value: number) => void;
  toggleSimulation: () => void;
  reset: () => void;
};

const defaultSystems: Record<SystemId, boolean> = {
  skeletal: true,
  muscular: true,
  nervous: false,
  cardiovascular: true,
  respiratory: true,
};

export const useAnatomyStore = create<AnatomyState>((set) => ({
  activeSystems: defaultSystems,
  selectedPartId: 'heart',
  heartRate: 72,
  breathingRate: 14,
  simulationRunning: true,
  selectPart: (selectedPartId) => set({ selectedPartId }),
  toggleSystem: (id) => set((state) => ({ activeSystems: { ...state.activeSystems, [id]: !state.activeSystems[id] } })),
  setHeartRate: (heartRate) => set({ heartRate }),
  setBreathingRate: (breathingRate) => set({ breathingRate }),
  toggleSimulation: () => set((state) => ({ simulationRunning: !state.simulationRunning })),
  reset: () => set({ activeSystems: defaultSystems, selectedPartId: 'heart', heartRate: 72, breathingRate: 14, simulationRunning: true }),
}));

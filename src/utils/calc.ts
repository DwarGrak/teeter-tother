import Position from '@/interfaces/Position';
import store from '@/store';
import { degToRad } from './angle';

export const calcMassCoordinatesOnSwing = (
  position: number,
  angleDeg: number
): Position => {
  const { sceneWidth, sceneHeight, standHeight, leverWidth } =
    store.state.settings;

  const angleRad = degToRad(angleDeg);

  return {
    x:
      sceneWidth / 2 +
      Math.cos(angleRad) * position -
      Math.sin(angleRad) * leverWidth,
    y:
      sceneHeight -
      standHeight -
      Math.cos(angleRad) * leverWidth -
      Math.sin(angleRad) * position,
  };
};

export const calcDisplacement = (pos: number, speed: number, delay: number) =>
  pos + (delay / 1000) * speed;

export interface Restrictions {
  min: number;
  max: number;
}

export const applyRestrictions = (
  value: number,
  min: number,
  max: number
): number => Math.max(Math.min(value, max), min);

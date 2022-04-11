import MovableMass from '@/interfaces/MovableMass';
import Position from '@/interfaces/Position';
import store from '@/store';
import { calcAngleByDisps } from './angle';

export const calcMassCoordinatesOnSwing = (
  position: number,
  angle: number
): Position => {
  const { sceneWidth, sceneHeight, standHeight, leverWidth } =
    store.state.settings;

  return {
    x:
      sceneWidth / 2 +
      Math.cos(angle) * position -
      Math.sin(angle) * leverWidth,
    y:
      sceneHeight -
      standHeight -
      Math.cos(angle) * leverWidth -
      Math.sin(angle) * position,
  };
};

export const distByDisp = (dx: number, dy: number) =>
  Math.sqrt(dx * dx + dy * dy);

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

export const calcPositionOnSwing = (
  mass: MovableMass,
  angle: number
): number | undefined => {
  const swingCenter = calcMassCoordinatesOnSwing(0, angle);
  const dx = mass.x.pos - swingCenter.x;
  const dy = mass.y.pos - swingCenter.y;
  const massAngle = calcAngleByDisps(dx, dy);
  if (massAngle < -angle) {
    return -distByDisp(dx, dy);
  }
};

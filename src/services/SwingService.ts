import MovableMass from '@/interfaces/MovableMass';
import Position from '@/interfaces/Position';
import store from '@/store';
import { calcAngleByDisps } from '@/utils/angle';
import { distByDisp } from '@/utils/calc';

export const swingToPos = (position: number, angle: number): Position => {
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

export const posToSwing = (
  mass: MovableMass,
  angle: number
): number | undefined => {
  const swingCenter = swingToPos(0, angle);
  const dx = mass.x.pos - swingCenter.x;
  const dy = mass.y.pos - swingCenter.y;
  const dir = dx < 0 ? -1 : 1;
  const massAngle = calcAngleByDisps(dx, dy);
  if (massAngle < -angle === (dir === 1)) return;
  return distByDisp(dx, dy) * dir;
};

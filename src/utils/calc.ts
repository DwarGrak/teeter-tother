import Coordinates from '@/interfaces/Position';
import store from '@/store';
import { degToRad } from './angle';

export const calcMassCoordinatesOnSwing = (
  position: number,
  angleDeg: number
): Coordinates => {
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

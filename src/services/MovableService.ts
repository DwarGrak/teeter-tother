import Movable from '@/interfaces/Movable';
import MovableMass from '@/interfaces/MovableMass';
import {
  applyRestrictions,
  calcDisplacement,
  Restrictions,
} from '@/utils/calc';

export const updateCoordinate = (coord: Movable, delay: number): number => {
  coord.v = calcDisplacement(coord.v, coord.a, delay);
  const pos = calcDisplacement(coord.pos, coord.v, delay);

  return pos;
};
export const moveMassByCoordinate = (
  coord: Movable,
  delay: number,
  rest?: Restrictions
): boolean => {
  const pos = updateCoordinate(coord, delay);
  if (rest) {
    coord.pos = applyRestrictions(pos, rest.min, rest.max);
    return pos === rest.min || pos === rest.max;
  } else {
    coord.pos = pos;
    return false;
  }
};

export const moveMass = (
  mass: MovableMass,
  delay: number,
  restX?: Restrictions,
  restY?: Restrictions
) => {
  const stopX = moveMassByCoordinate(mass.x, delay, restX);
  const stopY = moveMassByCoordinate(mass.y, delay, restY);
  if (stopX || stopY) {
    stopMass(mass);
  }
};

export const stopMass = (mass: MovableMass): void => {
  mass.x = { ...mass.x, v: 0, a: 0 };
  mass.y = { ...mass.y, v: 0, a: 0 };
};

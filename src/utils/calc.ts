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

export const calcMoment = (mass: number, dist: number) => mass * dist;

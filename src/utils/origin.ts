export enum OriginX {
  'left' = 0,
  'center' = 0.5,
  'right' = 1,
}
export enum OriginY {
  'top' = 0,
  'center' = 0.5,
  'bottom' = 1,
}

export const useOrigin = (position: number, size: number, originDisp: number) =>
  position - size * originDisp;

export enum OriginXList {
  'left' = -1,
  'center' = 0,
  'right' = 1,
}
export enum OriginYList {
  'top' = -1,
  'center' = 0,
  'bottom' = 1,
}

export const useOrigin = (
  position: number,
  size: number,
  originDisp: number
) => {
  return position + (size / 2) * originDisp;
};

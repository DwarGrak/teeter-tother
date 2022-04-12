export const degToRad = (deg: number): number => deg * (Math.PI / 180);

export const radToDeg = (rad: number): number => rad / (Math.PI / 180);

export const calcAngleByDisps = (dx: number, dy: number) => Math.atan(dy / dx);

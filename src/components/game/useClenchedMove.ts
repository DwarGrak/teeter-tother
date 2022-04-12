import { ComputedRef } from 'vue';
import MovableMass from '@/interfaces/MovableMass';
import { stopMass } from '@/services/MovableService';

export default function useClenchedMove(
  massRef: ComputedRef<MovableMass | undefined>,
  speedMult: number
) {
  const startMove = (direction: number) => {
    const mass = massRef.value;
    if (!mass) return;
    if (mass.x.v && direction > 0 === mass.x.v > 0) return;
    mass.x.v = 0;
    mass.x.a = direction * speedMult;
  };

  const startMoveLeft = () => startMove(-1);
  const startMoveRight = () => startMove(1);
  const stopMove = () => massRef.value && stopMass(massRef.value);

  return { startMoveLeft, startMoveRight, stopMove };
}

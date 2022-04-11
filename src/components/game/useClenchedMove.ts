import MassX from '@/interfaces/MassX';
import { ref } from 'vue';

export default function useClenchedMove(
  mass: MassX | undefined,
  minX: number,
  maxX: number,
  speedMult: number
) {
  const moveStart = ref<number>(0);
  const direction = ref<number>(0);

  const calcSpeed = () => {
    const moveTime = Date.now() - moveStart.value;
    return (moveTime / 1000) * speedMult * direction.value;
  };

  const move = () => {
    if (!direction.value) return;
    if (!mass) throw new Error('Mass is not found');
    const nextX = mass.x + calcSpeed();
    mass.x = Math.max(Math.min(nextX, maxX), minX);
    if (mass.x === minX || mass.x === maxX) {
      stopMove();
    }
  };

  const startMove = (newDirection: number) => {
    if (!mass) return;
    if (newDirection === direction.value) return;
    stopMove();
    moveStart.value = Date.now();
    direction.value = newDirection;
  };

  const stopMove = () => {
    moveStart.value = 0;
    direction.value = 0;
  };

  const startMoveLeft = () => startMove(-1);
  const startMoveRight = () => startMove(1);

  return { move, startMoveLeft, startMoveRight, stopMove };
}

import MassX from '@/interfaces/MassX';
import { ref } from 'vue';

const startSpeed = 2;
const speedMult = 1.1;

export default function useClenchedMove(
  mass: MassX | undefined,
  minX: number,
  maxX: number
) {
  const moveInt = ref<number>();
  const speed = ref<number>(0);

  const move = () => {
    if (!mass) throw new Error('Mass is not found');
    const nextX = mass.x + speed.value;
    mass.x = Math.max(Math.min(nextX, maxX), minX);
    if (mass.x === minX || mass.x === maxX) {
      stopMove();
    } else {
      speed.value *= speedMult;
    }
  };

  const startMove = (direction: number) => {
    if (!mass) return;
    if (speed.value && direction > 0 === speed.value > 0) return;
    stopMove();
    speed.value = startSpeed * direction;
    moveInt.value = setInterval(move, 100);
  };

  const stopMove = () => {
    if (moveInt.value === undefined) return;
    clearInterval(moveInt.value);
    moveInt.value = undefined;
    speed.value = 0;
  };

  const startMoveLeft = () => startMove(-1);
  const startMoveRight = () => startMove(1);

  return { startMoveLeft, startMoveRight, stopMove };
}

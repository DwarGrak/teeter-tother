import { ref, ComputedRef } from 'vue';
import GameMass from '@/interfaces/GameMass';

export default function useDrop(
  clenchedMass: ComputedRef<GameMass | undefined>,
  addNewClenchedMass: () => void,
  gravityAcceleration: number,
  dropDelay: number
) {
  const dropTimer = ref(0);

  const dropMass = () => {
    if (!clenchedMass.value) return;
    clenchedMass.value.x = { ...clenchedMass.value.x, v: 0, a: 0 };
    clenchedMass.value.y = {
      ...clenchedMass.value.y,
      v: 0,
      a: gravityAcceleration,
    };
    clenchedMass.value.status = 'falling';
    dropTimer.value = Date.now() + dropDelay;
  };

  const checkDropTimer = (now: number) => {
    if (dropTimer.value && dropTimer.value < now) {
      dropTimer.value = 0;
      if (!clenchedMass.value) {
        addNewClenchedMass();
      }
    }
  };

  const clearDropTimer = () => (dropTimer.value = 0);

  return { dropMass, checkDropTimer, clearDropTimer };
}

import { ref } from 'vue';
import MovableMass from '@/interfaces/MovableMass';
import { calcDisplacement } from '@/utils/calc';

export default function useSwing(momentAcceleration: number) {
  const swingAngle = ref(0);
  const swingSpeed = ref(0);
  const swingMoment = ref(0);

  const initSwing = () => {
      swingAngle.value = 0;
      swingSpeed.value = 0;
      swingMoment.value = 0;
  }

  const addMoment = (moment: number) => {
    swingMoment.value -= moment * momentAcceleration;
  };

  const addMassToSwing = (mass: MovableMass) => {
    const moment = mass.x.pos * mass.mass;
    addMoment(moment);
  };

  const rotateSwing = (delay: number) => {
    swingSpeed.value = calcDisplacement(
      swingSpeed.value,
      swingMoment.value,
      delay
    );
    swingAngle.value = calcDisplacement(
      swingAngle.value,
      swingSpeed.value,
      delay
    );
  };

  return { swingAngle, initSwing, addMassToSwing, rotateSwing };
}

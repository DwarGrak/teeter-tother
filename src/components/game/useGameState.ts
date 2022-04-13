import { ref } from 'vue';

export default function useGameState() {
  const isStarted = ref(false);
  const isPaused = ref(true);

  const setStartState = () => {
    isStarted.value = true;
    isPaused.value = false;
  };

  const setFinishState = () => {
    isStarted.value = false;
    isPaused.value = true;
  };

  return { isStarted, isPaused, setStartState, setFinishState };
}

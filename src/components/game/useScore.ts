import { ref } from 'vue';

export default function useScore() {
  const timer = ref(0);
  const score = ref(0);

  const updateScore = () => (score.value = Date.now() - timer.value);

  const clearScore = () => (timer.value = Date.now());

  return { score, clearScore, updateScore };
}

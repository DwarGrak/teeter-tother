import { ref } from 'vue';

export default function useDraw(draw: (delay: number) => void) {
  const tickTime = ref(Date.now());

  const tick = () => {
    const now = Date.now();
    const delay = now - tickTime.value;
    draw(delay);
    tickTime.value = now;
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

import { ref } from 'vue';

export default function useDraw(draw: (now: number, delay: number) => boolean) {
  const tickTime = ref(0);

  const tick = () => {
    const now = Date.now();
    const delay = now - tickTime.value;
    if (!draw(now, delay)) return;
    tickTime.value = now;
    requestAnimationFrame(tick);
  };

  const start = () => {
    tickTime.value = Date.now();
    tick();
  };

  return { start };
}

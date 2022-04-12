<template>
  <div v-if="text" class="banner">{{ text }}</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  started: { type: Boolean, default: false },
  paused: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
});

const text = computed((): string | null => {
  if (props.score)
    return `Your score ${(props.score / 1000).toFixed(
      1
    )}s! Press space to restart...`;
  if (!props.started) return 'Press space to start...';
  if (props.paused) return 'Press space to continue...';
  return null;
});
</script>

<style scoped lang="scss">
.banner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  font-size: 48px;
  padding-top: 200px;
  backdrop-filter: blur(5px) saturate(20%);
}
</style>

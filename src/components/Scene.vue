<template>
  <div class="scene" :style="style">
    <Swing :rotation="props.swingRotation" />
    <Mass :mass="5" :y="100" :x="100"><Triangle /></Mass>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import Swing from './Swing.vue';
import Mass from './shapes/Mass.vue';
import Triangle from './svg/Triangle.vue';

const props = defineProps({
  swingRotation: { type: Number, default: 0 },
});

const {
  state: { settings },
} = useStore();
const style = computed(() => ({
  width: settings.width + 'px',
  height: settings.height + 'px',
}));
</script>

<style scoped lang="scss">
.scene {
  position: relative;
  margin: 20px;
  border: 1px dashed black;
  overflow: hidden;
}
</style>

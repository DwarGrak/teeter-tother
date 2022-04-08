<template>
  <div class="scene" :style="style">
    <Swing />
    <Mass :mass="5" :y="100" :x="100"><Triangle /></Mass>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import Swing from './Swing.vue';
import Mass from './shapes/Mass.vue';
import Triangle from './svg/Triangle.vue';

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

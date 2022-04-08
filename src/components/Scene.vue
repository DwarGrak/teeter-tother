<template>
  <div class="scene" :style="style">
    <Swing :rotation="props.swingRotation" />
    <ShapeFabric
      v-for="mass in attachedMasses"
      :key="mass.id"
      :wrapper="Mass"
      v-bind="mass"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import Swing from './Swing.vue';
import Mass from './shapes/Mass.vue';
import ShapeFabric from './shapes/ShapeFabric.vue';
import AttachedMass from '@/interfaces/AttachedMass';

const props = defineProps({
  swingRotation: { type: Number, default: 0 },
  attachedMasses: { type: Array as AttachedMass[], default: () => [] },
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

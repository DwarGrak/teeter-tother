<template>
  <div class="scene">
    <Swing />
  </div>
</template>

<script setup lang="ts">
import Swing from './Swing.vue';
</script>

<style scoped lang="scss">
.scene {
  position: relative;
  margin: 20px;
  border: 1px dashed black;
  width: 800px;
  height: 800px;
}
</style>

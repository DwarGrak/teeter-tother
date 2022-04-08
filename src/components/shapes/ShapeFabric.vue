<template>
  <render />
</template>

<script setup lang="ts">
import { defineProps, h, useAttrs } from 'vue';
import { svgMap, svgName } from '../svg';

const props = defineProps({
  wrapper: { type: Object, required: true },
  type: { type: String as svgName, required: true },
});

const attrs = useAttrs();

const render = () => h(props.wrapper, attrs, () => h(svgMap[props.type]));
</script>

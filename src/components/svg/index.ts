import { Component } from 'vue';
import Circle from './Circle.vue';
import Square from './Square.vue';
import Triangle from './Triangle.vue';

type svgName = 'circle' | 'square' | 'triangle';

type SVGMap = {
  [key in svgName]: Component;
};
const svgMap: SVGMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
};

export { svgName, svgMap, Circle, Square, Triangle };

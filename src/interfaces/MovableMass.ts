import Mass from './Mass';
import Movable from './Movable';

export default interface MovableMass extends Mass {
  x: Movable;
  y: Movable;
}

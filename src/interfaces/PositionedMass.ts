import Mass from './Mass';
import Position from './Position';

export default interface PositionedMass extends Mass, Position {
  rotation: number;
}

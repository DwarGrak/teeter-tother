import MovableMass from './MovableMass';

export type GameMassStatus = 'clenched' | 'falling' | 'on-swing';

export default interface GameMass extends MovableMass {
  status: GameMassStatus;
}

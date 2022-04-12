export interface SettingsState {
  sceneWidth: number;
  sceneHeight: number;
  standHeight: number;
  leverLength: number;
  leverWidth: number;
  speedMult: number;
  maxAngle: number;
  gravityAcceleration: number;
  momentAcceleration: number;
  dropDelay: number;
  gameOverMass: number;
}

export const settings = {
  namespaced: true,
  state: (): SettingsState => ({
    sceneWidth: 1200,
    sceneHeight: 800,
    standHeight: 250,
    leverLength: 1000,
    leverWidth: 10,
    speedMult: 300,
    maxAngle: 30,
    gravityAcceleration: 1000,
    momentAcceleration: 5e-5,
    dropDelay: 1000,
    gameOverMass: 20,
  }),
};

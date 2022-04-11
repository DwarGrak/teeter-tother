export interface SettingsState {
  sceneWidth: number;
  sceneHeight: number;
  standHeight: number;
  leverLength: number;
  leverWidth: number;
  speedMult: number;
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
  }),
};

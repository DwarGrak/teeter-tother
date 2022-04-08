import { createStore } from 'vuex';
import { settings, SettingsState } from './modules/settings';

export interface State {
  settings: SettingsState;
}

export default createStore<State>({
  modules: { settings },
});

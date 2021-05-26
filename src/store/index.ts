import app, { IAppState } from "./modules/app";
import settings, { ISettingState } from "./modules/setting";
import user, { IUserSate } from './modules/user'

interface GlobalDataProps {
  app: IAppState;
  user: IUserSate;
  setting: ISettingState
}

import { createStore } from "vuex";

export default createStore<GlobalDataProps>({
  getters: {
    sidebar: (state) => state.app.sidebar,
    device: (state) => state.app.device,
    token: (state) => state.user.token,
    avatar: (state) => state.user.avatar,
    name: (state) => state.user.name,
  },
  modules: {
    settings,
    user,
    app,
  },
});

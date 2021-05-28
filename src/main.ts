import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/styles/index.scss"; // global css
import store, { GlobalDataPropsKey } from "./store";
import router from "./router";
import "@/styles/mixin.scss";
import "@/styles/variables.scss";
import { registerIcons } from "@/icons"; // icon
import "@/permission"; // permission control
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
registerIcons(app);
app.use(ElementPlus, { locale }).use(store, GlobalDataPropsKey).use(router);

router.isReady().then(() => app.mount("#app"));

import { createApp } from "vue"
import App from "./App.vue"
import plguin from "./plugin"
plguin(createApp(App)).mount("#app")

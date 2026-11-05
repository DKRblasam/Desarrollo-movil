import { registerRootComponent } from "expo";

import App from "@/App";

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App)
// y asegura que la app funcione igual en Expo Go o en un build nativo.
registerRootComponent(App);

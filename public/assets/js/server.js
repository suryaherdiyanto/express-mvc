import { createSSRApp } from "vue";
import Index from "../../pages/Index.vue";
var server_default = {
  Index: createSSRApp(Index)
};
export {
  server_default as default
};

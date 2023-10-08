import { createApp, h, DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";

createInertiaApp({
    id: 'app',
    resolve: name => {
      const pages = import.meta.glob<DefineComponent>('../../pages/**/*.vue', { eager: true })
      return pages[`../../pages/${name}.vue`]
    },
    setup({ el, App, props, plugin }) {
      createApp({ render: () => h(App, props) })
        .use(plugin)
        .mount(el)
    },
})
import * as esbuild from 'esbuild';
import vuePlugin from 'esbuild-plugin-vue-next';

const build = await esbuild.context({
    entryPoints: ["./assets/js/server.js"],
    outfile: "./public/assets/js/server.js",
    bundle: false,
    platform: "node",
    format: "esm",
    plugins: [vuePlugin()]
});


await build.watch();
console.log("Build watch ssr");
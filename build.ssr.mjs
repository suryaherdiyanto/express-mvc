import * as esbuild from 'esbuild';
import vuePlugin from 'esbuild-plugin-vue-next';

const build = await esbuild.context({
    entryPoints: ["./assets/js/server.js"],
    outfile: "./public/assets/js/server.js",
    minify: true,
    bundle: true,
    platform: "node",
    plugins: [vuePlugin()]
});


build.watch();
console.log("Build watch ssr");
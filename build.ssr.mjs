import * as esbuild from 'esbuild';
import vuePlugin from 'esbuild-plugin-vue-next';

const build = await esbuild.context({
    entryPoints: ["./assets/js/client.ssr.js"],
    outfile: "./public/assets/js/server.ssr.js",
    minify: true,
    bundle: true,
    plugins: [vuePlugin()]
});


build.watch();
console.log("Build watch ssr");
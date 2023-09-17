import * as esbuild from "esbuild";
import fs from 'fs';
const version = Date.now();

const cacheBusterPlugin = {
  name: 'cacheBusterPlugin',
  setup(build) {
    build.onStart(() => {
      console.log(`Adding cache buster ${version}`);
      const index = fs.readFileSync('./views/index.pug', {encoding: 'utf-8'});
      const newContent = index.replaceAll('%%VERSION%%', version);

      fs.writeFileSync('./views/index.pug', newContent);
    })
  },
};

await esbuild.build({
    entryPoints: ["./assets/js/client.ts"],
    outfile: `./public/assets/js/client.${version}.js`,
    bundle: true,
    minify: true,
    plugins: [cacheBusterPlugin]
});
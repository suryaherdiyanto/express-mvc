import * as esbuild from "esbuild";
import fs from 'fs';
const version = Date.now();

let assetPath = 'assets/js/client.js';

if (process.env.NODE_ENV === 'production') {
  assetPath = `assets/js/client.${version}.js`;
}

const buildOption = {
    entryPoints: ["./assets/js/client.js"],
    outfile: `./public/${assetPath}`,
    bundle: true,
    minify: process.env.NODE_ENV === 'production' ? true:false,
    sourcemap: process.env.NODE_ENV !== 'production' ? true:false,
};

if (process.env.NODE_ENV !== 'production') {
  const build = await esbuild.context(buildOption);

  if (process.env.NODE_ENV !== 'production') {
    build.watch();
    console.log('Build watch!');
  }
} else {
  esbuild.buildSync(buildOption);
}


fs.writeFileSync('./public/build-manifest.json', JSON.stringify({
  "/assets/js/client.js": assetPath
}));
import * as esbuild from "esbuild";
import fs from 'fs';
import vuePlugin from 'esbuild-plugin-vue-next';

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/ by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(name);
    }
  }
  return files;
}

const buildOption = {
    entryPoints: getFiles('./assets/js/vue'),
    outdir: './public/assets/js/vue',
    bundle: true,
    minify: process.env.NODE_ENV === 'production' ? true:false,
    sourcemap: process.env.NODE_ENV !== 'production' ? true:false,
    metafile: true,
    plugins: [vuePlugin()]
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


import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vuePlugin()],
    build: {
        manifest: true,
        outDir: 'dist/client',
        rollupOptions: {
            input: 'src/js/client.js',
            output: {
                entryFileNames: 'js/[name]-[hash].js'
            }
        },
    },
})
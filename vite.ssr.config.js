import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vuePlugin()],
    build: {
        outDir: 'dist/server',
        ssr: 'src/js/server.js'
    },
})
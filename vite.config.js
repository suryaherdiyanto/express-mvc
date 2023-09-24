import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vuePlugin()],
    build: {
        manifest: true,
        outDir: 'dist/client',
        rollupOptions: {
            input: {
                client: './src/js/client.js'
            }
        }
    }
})
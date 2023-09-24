import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import { createSSRApp } from "vue";
import { renderToNodeStream } from "vue/server-renderer";

const manifest = JSON.parse(readFileSync(path.resolve(__dirname, '../dist/client/manifest.json')).toString());

export const useVue = (_: Request, res: Response, next: NextFunction) => {
    res.renderVue = async (component: string, data = {}) => {
        const modules = await import('../dist/server/server.mjs');
        const script = manifest['src/js/client.js'];

        const pages = modules.default;

        const ssr = createSSRApp((pages as any)[component]);
        const renderStream = renderToNodeStream(ssr, data);
        let scriptTags = `<script type="module" src="/@vite/client"></script>
        <script type="module" src="/src/js/client.js"></script>`;

        if (process.env.NODE_ENV === 'production') {
            scriptTags = `<script src="/assets/${script['src/js/client.js']['file']}"></script>`
        }

        res.type('html');
        res.write(`
            <html>
                <head>
                    <title>Vue SSR</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="/assets/css/main.css" />
                    </head>
                    <body class="font-body bg-gray-200">
                <div id="app">
        `);
        renderStream.on('data', (chunk) => {
            res.write(chunk);
        });
        renderStream.on('end', () => {
            res.end(`
                </div>
                    ${scriptTags}
                </body>
                </html>
            `)
        });

    }
    next();
}
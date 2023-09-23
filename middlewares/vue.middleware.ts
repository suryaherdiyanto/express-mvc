import { NextFunction, Request, Response } from "express";
import { createSSRApp } from "vue";
import { renderToNodeStream, renderToString } from "vue/server-renderer";

const pages = require('../public/assets/js/server').default;


export const useVue = (_: Request, res: Response, next: NextFunction) => {
    res.renderVue = async (component: string, data = {}) => {

        const ssr = createSSRApp(pages[component]);
        const renderStream = renderToNodeStream(ssr, data);

        res.type('html');
        res.write(`
            <html>
                <head>
                    <title>Vue SSR</title>
                    <link rel="stylesheet" href="/assets/css/main.css" />
                </head>
                <body>
                <div id="app">
        `);
        renderStream.on('data', (chunk) => {
            res.write(chunk);
        });
        renderStream.on('end', () => {
            res.end(`
                </div>
                <script src="/assets/js/vue/Index.js"></script>
                </body>
                </html>
            `)
        });

    }
    next();
}
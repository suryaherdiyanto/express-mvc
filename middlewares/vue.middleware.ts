import { NextFunction, Request, Response } from "express";
import { createSSRApp } from "vue";
import { renderToNodeStream } from "vue/server-renderer";

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
                <script src="/assets/js/vue/Index.js"></script>
                </body>
                </html>
            `)
        });

    }
    next();
}
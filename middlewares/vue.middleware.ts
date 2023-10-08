import { NextFunction, Request, Response } from "express";

interface InertiaPage {
    component: string,
    props: {
        [key: string]: unknown
    },
    url: string,
    version: string
}
export const useInertia = (req: Request, res: Response, next: NextFunction) => {

    res.renderInertia = (component: string, props: {}) => {
        const page: InertiaPage = {
            component,
            props,
            url: req.path,
            version: process.env.APP_VERSION as string,
        }

        if (req.headers['X-Inertia'] || req.headers['x-inertia']) {
            return res.type('application/json').json(page);
        }

        res.type('html').render('index', { props: JSON.stringify(page) });
    }
    next();
}
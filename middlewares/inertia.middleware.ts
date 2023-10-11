import { NextFunction, Request, Response } from "express";

interface InertiaPage {
    component: string,
    props: {
        [key: string]: unknown
    },
    url: string,
    version: string
}

export interface ComponentProps {
	[key: string]: string | undefined
}

export const useInertia = (req: Request, res: Response, next: NextFunction) => {

    res.renderInertia = (component: string, props: ComponentProps) => {

		let pageComponent = Object.create({});
		const isPartialReload = req.header('X-Inertia-Partial-Component') && req.header('X-Inertia-Partial-Data');
		if (isPartialReload) {
			const partialData = req.header('X-Inertia-Partial-Data') as string;
			partialData.split(',').forEach((value) => {
				return Object.assign(pageComponent, { [value]: props[value] });
			});
		} else {
			Object.assign(pageComponent, props);
		}

        const page: InertiaPage = {
            component,
            props: {
                ...pageComponent,
                share: {
                    _token: req.session._csrf
                }
            },
            url: req.path,
            version: process.env.APP_VERSION as string,
        }

        if (req.header('X-Inertia')) {
            return res.setHeader("X-Inertia", "true").json(page);
        }

        res.type('html').render('index', { props: JSON.stringify(page) });
    }
    next();
}

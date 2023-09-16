import {NextFunction, Request, Response} from "express"

export function handle404 (_: Request, res: Response) {
	res.render('404');
}


export function handle500(err: Error, _: Request, res: Response, next: NextFunction) {
	if (err.stack) {
		res.status(500).render('500', { err });
	}

	next();
}

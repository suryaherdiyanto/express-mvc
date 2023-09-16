import {NextFunction, Request, Response} from "express"
import { ErrorResponse } from "../errors/response.error";
import { ValidationError } from "../errors/validation.error";

export function handle404 (_: Request, res: Response) {
	res.render('404');
}

export function handleValidation(err: ValidationError, req: Request, res: Response, next: NextFunction) {
	res.status(err.status);
	req.session.errors?.push(err.errors);
}

export function handle500(err: Error, _: Request, res: Response, next: NextFunction) {
	if (err.stack) {
		res.status(500).render('500', { err });
	}

	next();
}

import { Response, NextFunction, Request } from 'express';
import { ValidationError } from '../errors/validation.error';

export function handleValidation(err: ValidationError, req: Request, res: Response, next: NextFunction) {
	res.status(err.status);
	req.session.errors?.push(err.errors);
	next();
}
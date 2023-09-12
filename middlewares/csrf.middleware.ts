import {createHash} from "crypto";
import {NextFunction, Request, Response} from "express";
import * as dotenv from 'dotenv';

dotenv.config();
const csrfToken = createHash('sha256').update(process.env.APP_KEY as string + Date.now()).digest('hex');

declare module 'express-session' {
	export interface SessionData {
		'_csrf': string
	}
}

export function assignCsrf(req: Request, _: Response, next: NextFunction) {
	req.session['_csrf'] = csrfToken;
	next();
}

export function verifyCsrf(req: Request, _: Response, next: NextFunction) {
	if (req.method === 'GET') {
		return next();
	}

	if (!req.session._csrf) {
		throw new Error("Csrf token are not provided");
	}

	const { _token } = req.body;

	if (req.session._csrf !== _token) {
		throw new Error("Invalid token");
	}

	next();
}

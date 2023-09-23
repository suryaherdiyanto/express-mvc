import { ValidationErrorAttribute } from "../errors/validation.error";

declare module 'express-session' {
	export interface SessionData {
		'_csrf': string,
		'errors': ValidationErrorAttribute[]
	}
}

declare global {
    namespace Express {
        export interface Request {
            useService<T>(t: string): T
        }

        export interface Response {
            renderVue(page: string, data?: object): void
        }
    }
}
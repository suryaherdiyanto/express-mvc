import { ValidationErrorAttribute } from "../errors/validation.error";

declare module 'express-session' {
	export interface SessionData {
		'_csrf': string,
		'errors': ValidationErrorAttribute[]
	}
}

declare global {
    namespace Express {
        export interface Response {
            renderInertia(component: string, props?: ComponentProps): any
        }
    }
}

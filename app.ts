import express, { IRouterHandler, NextFunction, Request, Response } from "express";
import Express from "express";
import session, {SessionOptions} from "express-session";
import { assignCsrf, verifyCsrf } from "./middlewares/csrf.middleware";

interface AppOptions {
    statefull?: boolean | undefined,
    useView?: boolean,
    viewEngine?: string,
    viewPath?: string,
    staticUri?: string,
    staticPath?: string,
    sessionStorage?: session.Store
}

declare global {
    namespace Express {
        export interface Request {
            useService<T>(t: string): T
        }
    }
}

export class App {
    private app: express.Application;
    public services: any = {};

    private config: AppOptions = {
        statefull: false,
        useView: true,
        viewEngine: 'pug',
        viewPath: './views',
        staticUri: '/assets',
        staticPath: './public/assets'
    };

    constructor(config: Partial<AppOptions>) {
        this.app = express();
        Object.assign(this.config, config);

        this.setUp();
    }

    setSessionCookie() {
        const secureCookie = (process.env.APP_ENV === 'production') ? true:false;
        const sessionOptions: SessionOptions = {
            secret: process.env.APP_KEY as string,
            store: this.config.sessionStorage || new session.MemoryStore(),
            resave: false,
            saveUninitialized: false,
            cookie: { secure: secureCookie }
        };
        this.app.use(session(sessionOptions));
    }

    setView(viewEngine: string, path: string) {
        this.app.set('views', path);
        this.app.set('view engine', viewEngine);
    }

    setStatic(uri: string, path: string) {
        this.app.use(uri, express.static(path));
    }

    setStateFull() {
        this.app.use('^/api/*', Express.json());
        this.app.use(/^\/(?!api).*/, Express.urlencoded({ extended: false }));
        this.app.use(/^\/(?!api).*/, assignCsrf);
        this.app.use(/^\/(?!api).*/, verifyCsrf);
    }

    registerService<T>(name: string, service: T) {
        this.services[name] = service;
        return this;
    }

    getApp() {
        return this.app;
    }

    setUp() {

        if (!this.config.statefull) {
            this.setSessionCookie();
            this.setStateFull();
        }

        if (this.config.useView) {
            if (this.config.viewEngine && this.config.viewPath) {
                this.setView(this.config.viewEngine, this.config.viewPath);
            }

            if (this.config.staticUri && this.config.staticPath) {
                this.setStatic(this.config.staticUri, this.config.staticPath);
            }
        }

    }
}
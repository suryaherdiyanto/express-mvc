import express from "express";
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

export class App {
    private app: express.Application;
    private config: AppOptions = {
        statefull: false,
        useView: true,
        viewEngine: 'pug',
        viewPath: './views',
        staticUri: '/assets',
        staticPath: './public/assets'
    };

    constructor(private port: number, config: Partial<AppOptions>) {
        this.app = express();
        Object.assign(this.config, config);

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

        return this.app;

    }
}
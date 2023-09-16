import { NextFunction, Request, Response } from "express";
import {handle404, handle500} from "./middlewares/error-handle.middleware";
import session from "express-session";
import FileStore from "session-file-store";
import { App } from "./app";
import { home } from "./app.controller";

const fileStorage = FileStore(session);

export class AppService {
    constructor(private name: string) {
    }

    getName() {
        return this.name;
    }
}

export const app = new App(3000, {
	sessionStorage: new fileStorage(),
	statefull: true
}).registerService(AppService.name, new AppService('hello')).getApp();


app.get('/', home);

app.use(handle404);
app.use(handle500);
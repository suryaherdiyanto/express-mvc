import { Response } from "express";
import {handle404, handle500} from "./middlewares/error-handle.middleware";
import session from "express-session";
import FileStore from "session-file-store";
import { App } from "./app";

const fileStorage = FileStore(session);

export const app = new App(3000, {
	sessionStorage: new fileStorage(),
	statefull: true
}).setUp();


app.get('/', (_, res: Response) => {
	res.render('index');
});

app.use(handle404);
app.use(handle500);
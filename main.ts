import * as dotenv from "dotenv";
dotenv.config();

import { Response } from "express";
import session from "express-session";
import FileStore from "session-file-store";
import {handle404, handle500} from "./middlewares/error-handle.middleware";
import { App } from "./app";


const fileStorage = FileStore(session);
const app = new App(3000, {
	sessionStorage: new fileStorage(),
	statefull: true
}).setUp().run();


app.get('/', (_, res: Response) => {
	res.render('index');
});

app.use(handle404);
app.use(handle500);
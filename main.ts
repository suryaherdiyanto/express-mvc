import * as dotenv from "dotenv";
dotenv.config();

import {handle404, handle500} from "./middlewares/error-handle.middleware";
import session from "express-session";
import FileStore from "session-file-store";
import { App } from "./app";
import { home } from "./app.controller";

const fileStorage = FileStore(session);

export const app = new App({
	sessionStorage: new fileStorage(),
	statefull: true
}).getApp();


app.get('/', home);

app.use(handle404);
app.use(handle500);

app.listen(3000, () => console.log('App started at port 3000'));
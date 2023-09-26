import * as dotenv from "dotenv";
dotenv.config();

import "./providers";

import {handle404, handle500} from "./middlewares/error-handle.middleware";
import session from "express-session";
import FileStore from "session-file-store";
import { App } from "./app";
import { appRoute } from "./modules/app/app.route";
import { Application } from "express";

const fileStorage = FileStore(session);


async function createViteServer() {
	const app = new App({
		sessionStorage: new fileStorage(),
		statefull: true,
		staticPath: './dist/client'
	}).getApp();

	const { createServer } = await import("vite");
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom'});
	app.use(server.middlewares);

	return app;
}

const initApp = (app: Application) => {
	app.use(appRoute);
	app.use(handle404);
	app.use(handle500);

	app.listen(3000, () => console.log('App started at port 3000'));
}

if (process.env.NODE_ENV !== 'production') {
	createViteServer().then(initApp);
}

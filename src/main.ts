import express from "express";
import Express, { Response } from "express";
import * as dotenv from "dotenv";
import session, {SessionOptions} from "express-session";
import FileStore from "session-file-store";


const app = express();
dotenv.config();

const secureCookie = (process.env.NODE_ENV === 'production') ? true:false;
const fileStorage = FileStore(session);
const sessionOptions: SessionOptions = {
	secret: process.env.APP_KEY as string,
	store: new fileStorage(),
	resave: false,
	saveUninitialized: false,
	cookie: { secure: secureCookie }
};

app.use(session(sessionOptions));
app.use('^/api/*', Express.json());
app.use(/^\/(?!api).*/, Express.urlencoded({ extended: false }));

app.get('/', (_, res: Response) => {
	res.send('Woooo');
})

app.listen(3000, () => {
	console.log('Server started at port 3000');
});

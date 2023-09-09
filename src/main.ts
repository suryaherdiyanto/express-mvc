import express from "express";
import { Response } from "express";
import * as dotenv from "dotenv";
import session, {SessionOptions} from "express-session";
import FileStore from "session-file-store";


const app = express();
const fileStorage = FileStore(session);
const secureCookie = (process.env.NODE_ENV === 'production') ? true:false;
const sessionOptions: SessionOptions = {
	secret: process.env.APP_KEY as string,
	store: new fileStorage(),
	resave: false,
	saveUninitialized: false,
	cookie: { secure: secureCookie }
};

dotenv.config();
app.use(session(sessionOptions));

app.get('/', (_, res: Response) => {
	res.send('Hello World');
});

app.get('/test', (_, res: Response) => {
	res.send('From test');
});

app.listen(3000, () => {
	console.log('Server started at port 3000');
});

import express, {NextFunction} from "express";
import Express, { Response } from "express";
import * as dotenv from "dotenv";
import session, {SessionOptions} from "express-session";
import FileStore from "session-file-store";
import path from "path";


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

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

app.use(session(sessionOptions));
app.use('^/api/*', Express.json());
app.use(/^\/(?!api).*/, Express.urlencoded({ extended: false }));

app.get('/', (_, res: Response) => {
	res.render('index');
});

app.use((err: Error, _: any, res: Response, next: NextFunction) => {
	if (err.stack) {
		return res.status(500).render('500', { err });
	}
	res.render('404');
});

app.listen(3000, () => {
	console.log('Server started at port 3000');
});

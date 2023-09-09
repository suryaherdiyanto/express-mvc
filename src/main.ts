import express from "express";
import { Response } from "express";
import * as dotenv from "dotenv";


const app = express();
dotenv.config();

app.get('/', (_, res: Response) => {
	res.send('Hello World');
});

app.get('/test', (_, res: Response) => {
	res.send('From test');
});

app.listen(3000, () => {
	console.log('Server started at port 3000');
});

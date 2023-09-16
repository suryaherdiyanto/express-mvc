import { log } from "console";
import { Request, Response } from "express";
import { AppService } from "./server";

export function home(req: Request, res: Response) {
    res.render('index');
}
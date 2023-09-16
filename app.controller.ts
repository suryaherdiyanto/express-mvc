import { Request, Response } from "express";
import { AppService } from "./services/app.service";

export function home(req: Request, res: Response) {
    const name = req.useService<AppService>(AppService.name).getName();
    res.render('index', { name });
}
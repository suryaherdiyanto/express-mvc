import { Request, Response } from "express";

export function home(_: Request, res: Response) {
    res.render('index');
}
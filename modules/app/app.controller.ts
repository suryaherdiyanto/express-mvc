import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";
import { AppService } from "./app.service";

@injectable()
export class AppController {
    constructor(@inject('AppService') private service: AppService) {}

    home(_: Request, res: Response) {
        const name = this.service.getName();

        res.renderInertia('Index', { users: [], events: []});
    }

    about(_: Request, res: Response) {
        res.renderInertia('About', { name: "surya" });
    }
}

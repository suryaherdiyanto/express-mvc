import "reflect-metadata";
import { container } from "tsyringe";
import { AppService } from "./modules/app/app.service";
import { AppController } from "./modules/app/app.controller";


container.resolve(AppService);
container.resolve(AppController);
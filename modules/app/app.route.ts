import express from "express";
import { container } from "tsyringe";
import { AppController } from "./app.controller";

const appController = container.resolve(AppController);
export const appRoute = express.Router();

appRoute.get('/', appController.home.bind(appController));


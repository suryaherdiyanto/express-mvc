import "../../providers";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppController } from "../../modules/app/app.controller";


let request: Partial<Request>;
let response: Partial<Response>;
let controller: AppController;

beforeEach(() => {
    response = {
        render: jest.fn()
    };

    request = {};
    controller = container.resolve<AppController>(AppController);
});

describe("Home Controller", () => {
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("Should return home view", () => {

        const res = jest.spyOn(response, 'render');

        controller.home(request as Request, response as Response);
        expect(res).toHaveBeenCalledWith('index', { name: 'Surya' });
    });
})
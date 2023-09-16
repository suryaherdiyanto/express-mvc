import { Request, Response } from "express";
import { home } from "../app.controller";
import { AppService } from "../services/app.service";


let request: Partial<Request>;
let response: Partial<Response>;
beforeEach(() => {
    response = {
        render: jest.fn()
    };

    request = {
        useService: jest.fn().mockImplementation(() => new AppService())
    }
});

describe("Home Controller", () => {
    it("Should return home view", () => {

        const res = jest.spyOn(response, 'render');

        home(request as Request, response as Response);
        expect(res).toHaveBeenCalledWith('index', { name: 'Surya' });
    });
})
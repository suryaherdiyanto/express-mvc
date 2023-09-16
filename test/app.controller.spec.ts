import { Request, Response } from "express";
import { home } from "../app.controller";


let request: Partial<Request>;
let response: Partial<Response>;
beforeEach(() => {
    response = {
        render: jest.fn()
    };
});

describe("Home Controller", () => {
    it("Should return home view", () => {

        const res = jest.spyOn(response, 'render');

        home(request as Request, response as Response);
        expect(res).toHaveBeenCalledWith('index');
    });
})
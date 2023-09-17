import "./../../providers";

import request from "supertest";
import express from "express";
import { App } from "../../app";
import { appRoute } from "../../modules/app/app.route";

// App setup
let app: express.Application;

beforeEach(() => {
    app = new App({ statefull: true }).getApp();
    app.use(appRoute);
});

describe('Home Page', () => {
    it('Should return 200', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
    });
})
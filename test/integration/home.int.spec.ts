import * as dotenv from "dotenv";
dotenv.config();
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

    it('Should as JSON if the Inertia header was set', async () => {
        const response = await request(app).get('/').set("X-Inertia", "1");

        expect(response.headers["content-type"]).toContain('application/json');
    });

    it('Should as return a correct component', async () => {
        const response = await request(app).get('/').set("X-Inertia", "1");

        expect(response.body.component).toEqual('Index');
    });

    it('Should props defined', async () => {
        const response = await request(app).get('/').set("X-Inertia", "1");

        expect(response.body.props).toBeDefined();
    });

	it('Should can partialy return data for partial reloads', async () => {
		const response = await request(app).get('/').set('X-Inertia', '1').set('X-Inertia-Partial-Component', "Index").set('X-Inertia-Partial-Data', "events");

		expect(response.body.props.events).toBeDefined();
		expect(response.body.props.users).not.toBeDefined();
	})
})

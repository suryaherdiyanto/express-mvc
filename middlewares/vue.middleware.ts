import { NextFunction, Request, Response } from "express";

export const useInertia = (req: Request, res: Response, next: NextFunction) => {

    res.renderInertia = (component: string, props: {}) => {
        res.render(component, { props: JSON.stringify(props) });
    }
    next();
}
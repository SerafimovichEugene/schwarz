import { Request, Response, Application, NextFunction, RequestHandler } from 'express';

const indexController: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    res.render('index');
};

export default indexController;

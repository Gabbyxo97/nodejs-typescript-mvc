import * as express from 'express';

export default class HomeController {
    private path:string = '/';
    public router:express.Router = express.Router();

    constructor() {
        this.router.get(this.path, this.index);
    }

    index(req: express.Request, res: express.Response) {
        res.render('index');
    }
}
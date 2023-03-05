import express, {Express} from 'express';
import path from 'path';

export default class App {
    private readonly app:Express;
    
    constructor(controllers: any) {
        this.app = express();
        this.app.set('view engine', process.env.VIEW_ENGINE);
        this.app.set('views', path.join(process.cwd(), 'views', process.env.VIEW_ENGINE ?? ''));

        this.initializeControllers(controllers);
    }

    initializeControllers(controllers: any) {
        controllers.forEach((controller:any) => this.app.use('/', controller.router));
    }

    start() {
        const port:Number = Number(process.env.WEBSERVER_PORT);
        this.app.listen(port, () => console.log(`Express server listening on port ${port}`));
    }
}
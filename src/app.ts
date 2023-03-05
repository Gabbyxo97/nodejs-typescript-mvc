import express, {Express} from 'express';
import path from 'path';

export default class App {
    private readonly app:Express;
    private readonly port:Number;
    
    constructor(port:Number, controllers: any) {
        this.port = port;
        this.app = express();
        this.app.set('view engine', 'twig');
        this.app.set('views', path.join(__dirname, 'views', 'twig'));

        this.initializeControllers(controllers);
    }

    initializeControllers(controllers: any) {
        controllers.forEach((controller:any) => this.app.use('/', controller.router));
    }

    start() {
        this.app.listen(this.port, () => console.log(`Express server listening on port ${this.port}`));
    }
}
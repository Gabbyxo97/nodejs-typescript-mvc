import express, {Express} from 'express';
import path from 'path';
import bodyParser from "body-parser";

export default class App {
    private readonly app:Express;

    constructor(controllers: any) {
        this.app = express();
        this.app.set('view engine', process.env.VIEW_ENGINE);
        this.app.set('views', path.join(process.cwd(), 'views', process.env.VIEW_ENGINE ?? ''));
        this.app.use(express.static(path.join(process.cwd(), 'public')))
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        const database = require('./database/Database');
        database.init();

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

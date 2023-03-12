import express, {Express} from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import 'reflect-metadata';
import {createExpressServer} from 'routing-controllers';
import HomeController from './controllers/HomeController';
import PostController from './controllers/PostController';

declare module 'express-session' {
    interface SessionData {
        csrf_token: string|null;
    }
}

export default class App {
    private readonly app:Express;

    constructor(controllers: any) {
        this.app = createExpressServer({
            controllers: [HomeController, PostController]
        });
        this.app.set('view engine', process.env.VIEW_ENGINE);
        this.app.set('views', path.join(process.cwd(), 'views', process.env.VIEW_ENGINE ?? ''));
        this.app.use(express.static(path.join(process.cwd(), 'public')))
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
        this.app.use(session({
            secret: process.env.SESSION_SECRET ?? '',
            saveUninitialized: true,
            resave: false,
            cookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                maxAge: 1000,
                sameSite: false
            }
        }));

        const database = require('./database/Database');
        database.init();
    }

    start() {
        const port:Number = Number(process.env.WEBSERVER_PORT);
        this.app.listen(port, () => console.log(`Express server listening on port ${port}`));
    }
}

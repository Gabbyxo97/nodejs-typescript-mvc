import { existsSync } from 'fs';
import path from 'path';
import App from './app';
import HomeController from './controllers/HomeController';
import dotenv from 'dotenv';
import PostController from './controllers/PostController';

const envFilePath:string = path.join(process.cwd(), '.env');

if (!existsSync(envFilePath)) {
    console.log('Cannot find required .env file, please edit .env.example and rename it to .env');
    process.exit(0);
}

dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = new App([
    new HomeController(),
    new PostController()
]);
app.start();

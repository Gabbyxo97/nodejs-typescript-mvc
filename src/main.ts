import App from './app';
import HomeController from './controllers/home_controller';

const app = new App(1232, [
    new HomeController()
]);
app.start();
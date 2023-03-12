import * as express from 'express';
import {Controller, Get, Render} from 'routing-controllers';

@Controller('/')
export default class HomeController {
    @Get()
    @Render('index.twig')
    index() {
        return {};
    }
}

import * as express from 'express';
import Post from '../models/Post';
import path from 'path';
import PostFormType from "../forms/PostFormType";
import {Router} from "express";

export default class PostController {
    private _path:string = '/posts';
    private _router:express.Router = express.Router();
    private _posts:Post[] = [];

    constructor() {
        this._router.get(this._path, this.index.bind(this));
        this._router.get(path.join(this._path, 'create'), this.create.bind(this));
        this._router.post(path.join(this._path, 'create'), this.create.bind(this));

        const post = new Post();
        post.id = 1;
        post.title = 'Welcome to this website';
        post.body = 'This is not complete but have fun';
        this._posts.push(post);
    }

    index(req: express.Request, res: express.Response) {
        res.render('posts/index', { 'posts': this._posts });
    }

    create(req: express.Request, res: express.Response) {
        const form = new PostFormType();
        form.handle(req);

        if (form.submitted && form.valid) {
            const post = new Post();
            post.id = this._posts.reduce((previousValue, currentValue) => (currentValue.id > previousValue.id ? currentValue : previousValue)).id + 1;
            post.title = form.data.title;
            post.body = form.data.body;
            this._posts.push(post);
            res.redirect('/posts');
            return;
        }

        res.render('posts/create', {form: form});
    }

    public get router(): express.Router {
        return this._router;
    }
}
import * as express from 'express';
import Post from '../models/Post';
import path from 'path';
import PostFormType from '../forms/PostFormType';

export default class PostController {
    private _path:string = '/posts';
    private _router:express.Router = express.Router();
    private _postRepository = require('../repository/PostRepository');

    constructor() {
        this._router.get(this._path, this.index.bind(this));
        this._router.get(path.join(this._path, 'create'), this.create.bind(this));
        this._router.post(path.join(this._path, 'create'), this.create.bind(this));
    }

    async index(req: express.Request, res: express.Response) {
        res.render('posts/index', {
            'posts': await this._postRepository.findAll()
        });
    }

    async create(req: express.Request, res: express.Response) {
        const form = new PostFormType();
        form.handle(req);

        if (form.submitted && form.valid) {
            const post = new Post({'title': form.data.title, 'body': form.data.body});
            await this._postRepository.save(post);
            res.redirect('/posts');
            return;
        }

        res.render('posts/create', {form: form});
    }

    public get router(): express.Router {
        return this._router;
    }
}

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
        this._router.get(path.join(this._path, 'edit/:postId'), this.edit.bind(this));
        this._router.post(path.join(this._path, 'edit/:postId'), this.edit.bind(this));
    }

    async index(req: express.Request, res: express.Response) {
        res.render('posts/index', {
            'posts': await this._postRepository.findAll()
        });
    }

    async create(req: express.Request, res: express.Response) {
        const form = new PostFormType(new Post());
        form.handle(req);

        if (form.submitted && form.valid) {
            await this._postRepository.save(form.data);
            res.redirect('/posts');
            return;
        }

        res.render('posts/save', {form: form});
    }

    async edit(req: express.Request, res: express.Response) {
        const post = await this._postRepository.find(Number(req.params.postId));

        if (post === null) {
            return res.sendStatus(404);
        }

        const form = new PostFormType(post);
        form.handle(req);

        if (form.submitted && form.valid) {
            await this._postRepository.save(form.data);
            res.redirect('/posts');
            return;
        }

        res.render('posts/save', {form: form});
    }

    public get router(): express.Router {
        return this._router;
    }
}

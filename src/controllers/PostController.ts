import * as express from 'express';
import Post from '../models/Post';
import PostFormType from '../forms/PostFormType';
const Tokens = require('csrf')();
import {Controller, Get, Render, Post as PostRoute, Req, Res, Session} from 'routing-controllers';

@Controller('/posts', {transformRequest: false, transformResponse: false})
export default class PostController {
    private _postRepository = require('../repository/PostRepository');

    @Get()
    @Render('posts/index.twig')
    async index(@Session() session: any) {
        const posts = await this._postRepository.findAll()
        return {
            'posts': posts
        };
    }

    @Get('/create')
    // @PostRoute('/create')
    async create(@Session() session: any, @Req() req: express.Request, @Res() res: express.Response) {

        console.log(req.session);
        console.log(session);
        const form = new PostFormType(new Post());
        form.handle(req);

        if (form.csrfError) {
            res.redirect('/unauthorized');
            return;
        }

        if (form.submitted && form.valid && !form.csrfError) {
            await this._postRepository.save(form.data);
            res.redirect('/posts');
            return;
        }

        const secret = await Tokens.secret();
        session.csrf_token = Tokens.create(secret);

        res.render('posts/save', {form: form, csrfToken: session.csrf_token});
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

    async delete(req: express.Request, res: express.Response) {
        const post = await this._postRepository.find(Number(req.params.postId));

        if (post === null) {
            return res.sendStatus(404);
        }

        if (req.method === 'POST') {
            await this._postRepository.delete(post);
            return res.redirect('/posts');
        }

        res.render('posts/delete', {post: post});
    }
}

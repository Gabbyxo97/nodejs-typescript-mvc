import Post from '../models/Post';

class PostRepository {
    private _database = require('../database/Database');

    public async find(id: number): Promise<Post|null> {
        const rows = await this._database.query('SELECT * FROM posts WHERE id = ? LIMIT 1', [id]);
        const row = rows[0]
        return row !== undefined ? new Post(row) : null;
    }

    public async findAll(): Promise<Post[]> {
        const posts = [];

        const rows = await this._database.query('SELECT * FROM posts');

        for (const row in rows) {
            posts.push(new Post(rows[row]));
        }

        return posts;
    }

    public async save(post: Post): Promise<number> {
        if (post.id === null) {
            const result = await this._database.query('INSERT INTO posts (title, body) VALUES (?, ?)', [post.title, post.body]);
            post.id = result.insertId;
            return result.insertId;
        } else {
            const result = await this._database.query('UPDATE posts SET title = ?, body = ? WHERE id = ? LIMIT 1', [post.title, post.body, post.id]);
            console.log(result);
            return 0;
        }
    }
}

module.exports = new PostRepository();

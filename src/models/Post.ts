export default class Post {
    private _id:number = 0;
    private _title:string = '';
    private _body:string = '';

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    get body(): string {
        return this._body;
    }

    set body(body: string) {
        this._body = body;
    }
}
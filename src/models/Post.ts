export default class Post {
    private _id:number|null = null;
    private _title:string = '';
    private _body:string = '';

    constructor(rowData: any = null) {
        if (rowData != null) {
            this._id = rowData.id;
            this._title = rowData.title;
            this._body = rowData.body;
        }
    }

    get id(): number|null {
        return this._id;
    }

    set id(id: number|null) {
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

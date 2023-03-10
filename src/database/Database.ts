import mysql, {Pool} from 'promise-mysql';

class Database {
    private pool:Pool|null = null;

    public async init() {
        this.pool = await mysql.createPool({
            host: process.env.DB_HOSTNAME ?? '',
            user: process.env.DB_USERNAME ?? '',
            password: process.env.DB_PASSWORD ?? '',
            database: process.env.DB_NAME ?? ''
        });
    }

    public async query(queryStr: string, parameters: any = []) {
        return await this.pool?.query(queryStr, parameters)
    }
}

module.exports = new Database();

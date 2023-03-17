import express, { Express, Router } from "express";
import { DataSourceOptions } from "typeorm";
import { Database } from "./database";

export class App {
	public app: Express;
	public db: Database;

	constructor() {
		this.app = express();
	}

	public registerDatabase(options: object) {
		this.db = new Database(options as DataSourceOptions);
	}

	public registerRoutes(path: string, router: Router) {
		this.app.use(path, router);
	}

	public registerMiddlewares(middleware: any) {
		this.app.use(middleware);
	}

	public async start(port: number) {
		await this.db.start();
		this.app.listen(port, () => {
			console.log(`[APP] Listining on ${port}...`);
		});
	}

	public getExpress() {
		return this.app;
	}

	public getDb() {
		return this.db;
	}
}

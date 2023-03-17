import { DataSource, DataSourceOptions } from "typeorm";

export class Database {
  private connection: DataSource;

  constructor(options: DataSourceOptions) {
    this.connection = new DataSource(options) 
  }

  public async start() {
    try {
      await this.connection.initialize()
      console.log("[DATABASE] Initialized!")
    } catch (err) {
      console.log("[DATABASE] Failed to initialize!")
      console.log(err)
    }
  }

  public drop() {
    this.connection.dropDatabase();
  }

  public getConnection() {
    return this.connection;
  }
}
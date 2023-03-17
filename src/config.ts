export class Config {  
	public static get(env: string) {  
		if(env == "development") {
			return {
				type: "sqlite",
				database: "memory.db",
				synchronize: true,
			}
		}
		if(env == "test") {
			return {
				type: "sqlite",
				database: ":memory:",
				dropSchema: true,
				logging: false,
				synchronize: true,
			}
		}
	}
}
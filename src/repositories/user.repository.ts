import { app } from "@/index";
import { UserIn } from "@/interfaces/user.interface";
import { User } from "@/models";

export class UserRepository {
	static async all(filters: object): Promise<User[]> {
		const userRepository = app.db.getConnection().getRepository(User);
		const users = userRepository.find({
			where: filters,
		});
		return users;
	}

	static async get(filters: object): Promise<User> {
		const userRepository = app.db.getConnection().getRepository(User);
		const user = await userRepository.findOne({
			where: filters,
		});
		return user;
	}

	static async getById(id: number): Promise<User> {
		const userRepository = app.db.getConnection().getRepository(User);
		const user = await userRepository.findOne({
			where: {
				id: id,
			},
		});
		return user;
	}

	static async create(data: UserIn): Promise<User> {
		const userRepository = app.db.getConnection().getRepository(User);

		const user = userRepository.create({
			email: data.email,
			password: data.password,
		});

		return await user.save();
	}

	static async update(id: number, data: object) {
		const userRepository = app.db.getConnection().getRepository(User);

		await userRepository.update(id, data);

		const user = await UserRepository.getById(id);

		return user;
	}

	static async delete(id: number): Promise<User> {
		const userRepository = app.db.getConnection().getRepository(User);

		const selectedUser = await userRepository.findOne({
			where: { id: id },
		});

		const deletedUser = await userRepository.remove(selectedUser);

		return deletedUser;
	}
}

import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async getById(_id: ObjectId): Promise<User | null> {
		return this.userModel.findById({ _id, deleted: { $exists: false } });
	}

	async getByEmail(email: string): Promise<User | null> {
		return this.userModel.findOne({ email, deleted: { $exists: false } });
	}

	async update(_id: ObjectId, data: Partial<User>): Promise<User | null> {
		return this.userModel.findOneAndUpdate(
			{ _id },
			{ ...data, $unset: { deleted: 1 } },
			{ new: true },
		);
	}

	async create(data: Pick<User, 'email' | 'passwordHash'>): Promise<User> {
		const user = new this.userModel(data);
		return user.save();
	}

	async delete(_id: ObjectId): Promise<User | null> {
		return this.userModel.findOneAndUpdate({ _id }, { deleted: true }, { new: true });
	}
}

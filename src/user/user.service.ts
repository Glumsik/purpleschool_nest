import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongodb';
import { genSalt, hash } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { User } from './model/user.model';
import { USER_STATUS } from '../constants/constants';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async create({ email, password }: CreateUserDto): Promise<User> {
		const user = await this.userRepository.getByEmail(email);

		if (user) throw new BadRequestException(USER_STATUS.EXISTS);

		const salt = await genSalt(10);
		const newUser = {
			email,
			passwordHash: await hash(password, salt),
		};

		return this.userRepository.create(newUser);
	}

	async findById(id: ObjectId): Promise<User | null> {
		return this.userRepository.getById(id);
	}

	async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User | null> {
		return this.userRepository.update(id, updateUserDto);
	}

	async delete(id: ObjectId): Promise<User | null> {
		return this.userRepository.delete(id);
	}
}

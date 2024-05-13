import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongodb';
import { User } from './model/user.model';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.create(createUserDto);
	}

	@Get(':id')
	async findById(@Param('id') id: ObjectId): Promise<User> {
		const user = await this.userService.findById(id);

		if (!user) throw new Error(`User ID: ${id} not found`);

		return user;
	}

	@Put(':id')
	async update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.userService.update(id, updateUserDto);

		if (!user) throw new Error(`User ID: ${id} not found`);

		return user;
	}

	@Delete(':id')
	async delete(@Param('id') id: ObjectId): Promise<User> {
		const user = await this.userService.delete(id);

		if (!user) throw new Error(`User ID: ${id} not found`);

		return user;
	}
}

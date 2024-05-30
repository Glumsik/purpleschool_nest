import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongodb';
import { User } from './model/user.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../utils/decorators/userId.decorator';
import { Role } from '../constants/constants';
import { Roles } from '../utils/decorators/role.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.create(createUserDto);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findById(@UserId() userId: ObjectId): Promise<User> {
		const user = await this.userService.findById(userId);

		if (!user) throw new Error(`User ID: ${userId} not found`);

		return user;
	}

	@Put()
	@UseGuards(JwtAuthGuard)
	async update(@UserId() userId: ObjectId, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.userService.update(userId, updateUserDto);

		if (!user) throw new Error(`User ID: ${userId} not found`);

		return user;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	async delete(@Param('id') id: ObjectId): Promise<User> {
		const user = await this.userService.delete(id);

		if (!user) throw new Error(`User ID: ${id} not found`);

		return user;
	}
}

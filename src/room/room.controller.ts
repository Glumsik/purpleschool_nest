import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomQuery } from './query/room.query';
import { RoomDto } from './dto/room.dto';
import { Room } from './model/room.model';
import { ObjectId } from 'mongodb';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../utils/decorators/role.decorator';
import { Role } from '../constants/constants';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@Get()
	async getList(@Query() query: RoomQuery): Promise<Room[]> {
		return this.roomService.getList(query);
	}

	@Get(':id')
	async getById(@Param('id') id: ObjectId): Promise<Room> {
		const room = await this.roomService.getById(id);

		if (!room) throw new Error(`Room ID: ${id} not found`);

		return room;
	}

	@Post('create')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	async create(@Body() dto: RoomDto): Promise<Room> {
		return this.roomService.create(dto);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	async update(@Param('id') id: ObjectId, @Body() dto: RoomDto): Promise<Room> {
		const room = await this.roomService.update(id, dto);

		if (!room) throw new Error(`Room ID: ${id} not found`);

		return room;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	async delete(@Param('id') id: ObjectId): Promise<Room> {
		const room = await this.roomService.delete(id);

		if (!room) throw new Error(`Room ID: ${id} not found`);

		return room;
	}
}

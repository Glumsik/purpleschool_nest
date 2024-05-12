import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomQuery } from './query/room.query';
import { RoomDto } from './dto/room.dto';
import { Room } from './model/room.model';
import { ObjectId } from 'mongodb';

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
	async create(@Body() dto: RoomDto): Promise<Room> {
		return this.roomService.create(dto);
	}

	@Put(':id')
	async update(@Param('id') id: ObjectId, @Body() dto: RoomDto): Promise<Room> {
		const room = await this.roomService.update(id, dto);

		if (!room) throw new Error(`Room ID: ${id} not found`);

		return room;
	}

	@Delete(':id')
	async delete(@Param('id') id: ObjectId): Promise<Room> {
		const room = await this.roomService.delete(id);

		if (!room) throw new Error(`Room ID: ${id} not found`);

		return room;
	}
}

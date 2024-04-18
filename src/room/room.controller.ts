import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomQuery } from './query/room.query';
import { RoomDto } from './dto/room.dto';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@Get()
	async getList(@Query() query: RoomQuery) {
		return this.roomService.getList(query);
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		return this.roomService.getById(id);
	}

	@Post('create')
	async create(@Body() dto: RoomDto) {
		return this.roomService.create(dto);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: RoomDto) {
		return this.roomService.update(id, dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: number) {
		return this.roomService.delete(id);
	}
}

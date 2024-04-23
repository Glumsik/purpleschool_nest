import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';

@Controller('reservation')
export class ReservationController {
	constructor(private readonly scheduleService: ReservationService) {}

	@Get(':id')
	async getById(@Param('id') id: number) {
		return this.scheduleService.getById(id);
	}

	@Post('create')
	async create(@Body() dto: ReservationDto) {
		return this.scheduleService.create(dto);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: ReservationDto) {
		return this.scheduleService.update(id, dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: number) {
		return this.scheduleService.delete(id);
	}
}

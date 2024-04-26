import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';
import { Reservation } from './model/reservation.model';

@Controller('reservation')
export class ReservationController {
	constructor(private readonly reservationService: ReservationService) {}

	@Get(':id')
	async getById(@Param('id') id: string): Promise<Reservation> {
		const reservation = await this.reservationService.getById(id);

		if (!reservation) throw new Error(`Reservation ID: ${id} not found`);

		return reservation;
	}

	@Post('create')
	async create(@Body() dto: ReservationDto): Promise<Reservation> {
		return this.reservationService.create(dto);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: ReservationDto): Promise<Reservation> {
		const reservation = await this.reservationService.update(id, dto);

		if (!reservation) throw new Error(`Reservation ID: ${id} not found`);

		return reservation;
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<Reservation> {
		const reservation = await this.reservationService.delete(id);

		if (!reservation) throw new Error(`Reservation ID: ${id} not found`);

		return reservation;
	}
}

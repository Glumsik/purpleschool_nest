import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';
import { Reservation } from './model/reservation.model';
import { ObjectId } from 'mongodb';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../utils/decorators/userId.decorator';

@Controller('reservation')
export class ReservationController {
	constructor(private readonly reservationService: ReservationService) {}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async getById(@UserId() userId: ObjectId): Promise<Reservation[]> {
		const reservations = await this.reservationService.getReservations(userId);

		if (!reservations?.length) throw new Error(`Reservations not found`);

		return reservations;
	}

	@Post('create')
	@UseGuards(JwtAuthGuard)
	async create(@Body() dto: ReservationDto, @UserId() userId: ObjectId): Promise<Reservation> {
		return this.reservationService.create(dto, userId);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async update(@Param('id') id: ObjectId, @Body() dto: ReservationDto): Promise<Reservation> {
		const reservation = await this.reservationService.update(id, dto);

		if (!reservation) throw new Error(`Reservation ID: ${id} not found`);

		return reservation;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async delete(@Param('id') id: ObjectId): Promise<Reservation> {
		const reservation = await this.reservationService.delete(id);

		if (!reservation) throw new Error(`Reservation ID: ${id} not found`);

		return reservation;
	}
}

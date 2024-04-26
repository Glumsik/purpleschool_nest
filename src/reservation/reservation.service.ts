import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './model/reservation.model';
import { MessageReply } from '../constants/constants';

@Injectable()
export class ReservationService {
	constructor(private readonly reservationRepository: ReservationRepository) {}

	async getById(id: string): Promise<Reservation | null> {
		return this.reservationRepository.getById(id);
	}

	async create(data: ReservationDto): Promise<Reservation> {
		const { startDate, endDate } = data;

		if (startDate > endDate)
			throw new HttpException(MessageReply.INVALID_DATE, HttpStatus.BAD_REQUEST);

		const isBusy = await this.reservationRepository.checkReservationRoom(data);

		if (isBusy) throw new HttpException(MessageReply.BUSY, HttpStatus.CONFLICT);

		return this.reservationRepository.create(data);
	}

	async update(id: string, data: ReservationDto): Promise<Reservation | null> {
		const { startDate, endDate } = data;

		if (startDate > endDate)
			throw new HttpException(MessageReply.INVALID_DATE, HttpStatus.BAD_REQUEST);

		const isBusy = await this.reservationRepository.checkReservationRoom(data);

		if (isBusy) throw new HttpException(MessageReply.BUSY, HttpStatus.CONFLICT);

		return this.reservationRepository.update(id, data);
	}

	async delete(id: string): Promise<Reservation | null> {
		return this.reservationRepository.delete(id);
	}
}

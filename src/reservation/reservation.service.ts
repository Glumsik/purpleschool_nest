import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { CounterService } from '../counter/counter.service';
import { Reservation } from './model/reservation.model';
import { CounterName, MessageReply } from '../constants/constants';

@Injectable()
export class ReservationService {
	constructor(
		private readonly reservationRepository: ReservationRepository,
		private readonly counterService: CounterService,
	) {}

	async getById(id: number): Promise<Reservation> {
		return this.reservationRepository.getById(id);
	}

	async create(data: ReservationDto): Promise<Reservation> {
		const { startDate, endDate } = data;

		if (startDate > endDate) {
			throw new HttpException(MessageReply.INVALID_DATE, HttpStatus.BAD_REQUEST);
		}

		const isBusy = await this.reservationRepository.checkReservationRoom(data);

		if (isBusy) {
			throw new HttpException(MessageReply.BUSY, HttpStatus.CONFLICT);
		} else {
			const id = await this.counterService.getNextCounter(CounterName.SCHEDULE);
			return this.reservationRepository.create({ ...data, id });
		}
	}

	async update(id: number, data: ReservationDto) {
		const { startDate, endDate } = data;

		if (startDate > endDate) {
			throw new HttpException(MessageReply.INVALID_DATE, HttpStatus.BAD_REQUEST);
		}

		const isBusy = await this.reservationRepository.checkReservationRoom(data);

		if (isBusy) {
			throw new HttpException(MessageReply.BUSY, HttpStatus.CONFLICT);
		} else {
			return this.reservationRepository.update(id, data);
		}
	}

	async delete(id: number) {
		return this.reservationRepository.delete(id);
	}
}

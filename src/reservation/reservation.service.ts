import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './model/reservation.model';
import { MessageReply } from '../constants/constants';
import { ObjectId } from 'mongodb';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class ReservationService {
	constructor(
		private readonly reservationRepository: ReservationRepository,
		private readonly telegramService: TelegramService,
	) {}

	async getReservation(id: ObjectId): Promise<Reservation | null> {
		return this.reservationRepository.getById(id);
	}

	async create(data: ReservationDto, userId: ObjectId): Promise<Reservation> {
		const { startDate, endDate } = data;

		if (startDate > endDate)
			throw new HttpException(MessageReply.INVALID_DATE, HttpStatus.BAD_REQUEST);

		const isBusy = await this.reservationRepository.checkReservationRoom(data);

		if (isBusy) throw new HttpException(MessageReply.BUSY, HttpStatus.CONFLICT);

		this.telegramService.sendMessage(
			`New reservation from ${startDate} to ${endDate}, room ${data.roomId}`,
		);

		return this.reservationRepository.create({ ...data, userId });
	}

	async update(id: ObjectId, data: ReservationDto): Promise<Reservation | null> {
		const { startDate, endDate } = data;

		if (startDate > endDate)
			throw new HttpException(MessageReply.INVALID_DATE, HttpStatus.BAD_REQUEST);

		const isBusy = await this.reservationRepository.checkReservationRoom(data);

		if (isBusy) throw new HttpException(MessageReply.BUSY, HttpStatus.CONFLICT);

		return this.reservationRepository.update(id, data);
	}

	async delete(id: ObjectId): Promise<Reservation | null> {
		this.telegramService.sendMessage(`Delete reservation from ${id}`);

		return this.reservationRepository.delete(id);
	}
}

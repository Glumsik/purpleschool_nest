import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './model/reservation.model';

@Injectable()
export class ReservationRepository {
	constructor(
		@InjectModel(Reservation.name)
		private readonly scheduleModel: Model<Reservation>,
	) {}

	async getById(id: number): Promise<Reservation> {
		return this.scheduleModel.findOne({ id, deleted: { $exists: false } });
	}

	async checkReservationRoom(data: Partial<Reservation>): Promise<Reservation | null> {
		const { roomId, startDate: newStartDate, endDate: newEndDate } = data;

		return this.scheduleModel.findOne({
			roomId,
			startDate: { $lte: newEndDate },
			endDate: { $gte: newStartDate },
			deleted: { $exists: false },
		});
	}

	async update(id: number, data: Partial<Reservation>): Promise<Reservation> {
		return this.scheduleModel.findOneAndUpdate(
			{ id },
			{ ...data, $unset: { deleted: 1 } },
			{ new: true },
		);
	}

	async create(data: Partial<Reservation>): Promise<Reservation> {
		const schedule = new this.scheduleModel(data);
		return schedule.save();
	}

	async delete(id: number) {
		return this.scheduleModel.findOneAndUpdate({ id }, { deleted: true }, { new: true });
	}
}

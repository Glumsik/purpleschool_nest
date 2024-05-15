import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Reservation } from './model/reservation.model';

@Injectable()
export class ReservationRepository {
	constructor(
		@InjectModel(Reservation.name)
		private readonly reservationModel: Model<Reservation>,
	) {}

	async getById(_id: ObjectId): Promise<Reservation | null> {
		return this.reservationModel.findById({ _id, deleted: { $exists: false } });
	}

	async checkReservationRoom(data: Partial<Reservation>): Promise<Reservation | null> {
		const { roomId, startDate: newStartDate, endDate: newEndDate } = data;

		return this.reservationModel.findOne({
			roomId,
			startDate: { $lte: newEndDate },
			endDate: { $gte: newStartDate },
			deleted: { $exists: false },
		});
	}

	async update(_id: ObjectId, data: Partial<Reservation>): Promise<Reservation | null> {
		return this.reservationModel.findOneAndUpdate(
			{ _id },
			{ ...data, $unset: { deleted: 1 } },
			{ new: true },
		);
	}

	async create(data: Partial<Reservation>): Promise<Reservation> {
		const schedule = new this.reservationModel(data);
		return schedule.save();
	}

	async delete(_id: ObjectId): Promise<Reservation | null> {
		return this.reservationModel.findOneAndUpdate({ _id }, { deleted: true }, { new: true });
	}
}

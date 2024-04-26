import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './model/room.model';
import { Model } from 'mongoose';
import { RoomQuery } from './query/room.query';

@Injectable()
export class RoomRepository {
	constructor(
		@InjectModel(Room.name)
		private readonly roomModel: Model<Room>,
	) {}

	async getList(query: RoomQuery): Promise<Room[]> {
		const { limit, offset, type, view } = query;
		const where: { type?: string; view?: string } = {};

		if (type) where.type = type;
		if (view) where.view = view;

		return this.roomModel
			.find({ ...where, deleted: { $exists: false } })
			.skip(offset)
			.limit(limit)
			.sort({ id: 1 });
	}

	async getById(_id: string): Promise<Room | null> {
		return this.roomModel.findById({ _id, deleted: { $exists: false } });
	}

	async update(_id: string, data: Partial<Room>): Promise<Room | null> {
		return this.roomModel.findOneAndUpdate({ _id }, data, { new: true });
	}

	async create(data: Partial<Room>): Promise<Room> {
		const newRoom = new this.roomModel(data);
		return newRoom.save();
	}

	async delete(_id: string) {
		return this.roomModel.findOneAndUpdate({ _id }, { deleted: true }, { new: true });
	}
}

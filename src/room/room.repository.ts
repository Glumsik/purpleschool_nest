import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './model/room.model';
import { Model } from 'mongoose';
import { RoomQuery } from './query/room.query';
import { RoomDto } from './dto/room.dto';

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

	async getById(id: number): Promise<Room> {
		return this.roomModel.findOne({ id, deleted: { $exists: false } });
	}

	async update(id: number, data: Partial<Room>): Promise<Room> {
		return this.roomModel.findOneAndUpdate({ id }, data, { new: true });
	}

	async create(data: Partial<Room>): Promise<Room> {
		const newRoom = new this.roomModel(data);
		return newRoom.save();
	}

	async delete(id: number) {
		return this.roomModel.findOneAndUpdate({ id }, { deleted: true }, { new: true });
	}
}

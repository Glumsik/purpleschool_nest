import { Injectable } from '@nestjs/common';
import { Room } from './model/room.model';
import { RoomRepository } from './room.repository';
import { CounterService } from '../counter/counter.service';
import { CollectionName, CounterName } from '../constants/constants';
import { RoomQuery } from './query/room.query';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
	constructor(
		private readonly roomRepository: RoomRepository,
		private readonly counterService: CounterService,
	) {}

	async getList(query: RoomQuery): Promise<Room[]> {
		return this.roomRepository.getList(query);
	}

	async getById(id: number): Promise<Room> {
		return this.roomRepository.getById(id);
	}

	async create(data: RoomDto): Promise<Room> {
		const id = await this.counterService.getNextCounter(CounterName.ROOM);
		return this.roomRepository.create({ ...data, id });
	}

	async update(id: number, data: RoomDto): Promise<Room> {
		return this.roomRepository.update(id, data);
	}

	async delete(id: number) {
		return this.roomRepository.delete(id);
	}
}

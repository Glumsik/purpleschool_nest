import { Injectable } from '@nestjs/common';
import { Room } from './model/room.model';
import { RoomRepository } from './room.repository';
import { RoomQuery } from './query/room.query';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
	constructor(private readonly roomRepository: RoomRepository) {}

	async getList(query: RoomQuery): Promise<Room[]> {
		return this.roomRepository.getList(query);
	}

	async getById(id: string): Promise<Room | null> {
		return this.roomRepository.getById(id);
	}

	async create(data: RoomDto): Promise<Room> {
		return this.roomRepository.create(data);
	}

	async update(id: string, data: RoomDto): Promise<Room | null> {
		return this.roomRepository.update(id, data);
	}

	async delete(id: string): Promise<Room | null> {
		return this.roomRepository.delete(id);
	}
}

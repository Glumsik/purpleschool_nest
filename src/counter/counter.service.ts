import { Injectable } from '@nestjs/common';
import { CounterRepository } from './counter.repository';

@Injectable()
export class CounterService {
	constructor(private readonly counterRepository: CounterRepository) {}

	async getNextCounter(type: string): Promise<number> {
		return this.counterRepository.getNextCounter(type);
	}
}

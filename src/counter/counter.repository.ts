import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './counter.model';

@Injectable()
export class CounterRepository {
	constructor(
		@InjectModel(Counter.name)
		private readonly counterModel: Model<Counter>,
	) {}

	async getNextCounter(type: string): Promise<number> {
		const result = await this.counterModel.findOneAndUpdate(
			{ type },
			{ $inc: { current: 1 } },
			{ new: true, upsert: true },
		);
		return result.current;
	}
}

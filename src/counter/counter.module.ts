import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Counter, CounterModelSchema } from './counter.model';
import { CounterRepository } from './counter.repository';
import { CounterService } from './counter.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: Counter.name, schema: CounterModelSchema }])],
	providers: [CounterRepository, CounterService],
	exports: [CounterService, CounterRepository],
})
export class CounterModule {}

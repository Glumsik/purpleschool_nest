import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationModelSchema } from '../reservation/model/reservation.model';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { ReservationRepository } from '../reservation/reservation.repository';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationModelSchema }]),
	],
	controllers: [StatisticController],
	providers: [StatisticService, ReservationRepository],
})
export class StatisticModule {}

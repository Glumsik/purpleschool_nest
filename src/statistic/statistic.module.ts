import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
	imports: [ReservationModule],
	controllers: [StatisticController],
	providers: [StatisticService],
})
export class StatisticModule {}

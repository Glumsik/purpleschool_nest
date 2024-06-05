import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationModelSchema } from './model/reservation.model';
import { ReservationRepository } from './reservation.repository';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
	imports: [
		TelegramModule,
		MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationModelSchema }]),
	],
	controllers: [ReservationController],
	providers: [ReservationService, ReservationRepository],
	exports: [ReservationService, ReservationRepository],
})
export class ReservationModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import { getMongoConfig } from './utils/config/mongo.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		ReservationModule,
		RoomModule,
		UserModule,
		AuthModule,
		StatisticModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

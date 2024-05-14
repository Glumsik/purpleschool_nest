import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import { getUri } from './utils/config/mongo.config';
import { UserModule } from './user/user.module';
import { RolesGuard } from './auth/guards/role.guard';
import { AuthModule } from './auth/auth.module';

const { mongoDatabase, mongoDbUrl } = process.env;

const uri = mongoDbUrl || getUri();
const dbName = mongoDatabase || 'hotelDB';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(uri, { dbName: dbName }),
		ReservationModule,
		RoomModule,
		UserModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

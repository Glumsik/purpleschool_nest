import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import { getUri } from './utils/ds';

const { mongoDatabase, mongoDbUrl } = process.env;

const uri = mongoDbUrl || getUri();
const dbName = mongoDatabase || 'hotelDB';

@Module({
	imports: [MongooseModule.forRoot(uri, { dbName: dbName }), ReservationModule, RoomModule],
	controllers: [],
	providers: [],
})
export class AppModule {}

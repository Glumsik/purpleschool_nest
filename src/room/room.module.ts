import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomModelSchema } from './model/room.model';
import { RoomRepository } from './room.repository';

@Module({
	imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomModelSchema }])],
	controllers: [RoomController],
	providers: [RoomService, RoomRepository],
})
export class RoomModule {}

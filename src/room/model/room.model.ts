import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CollectionName } from '../../constants/constants';
import { FilesCreateDto } from '../../files/dto/files.create.dto';

@Schema({ collection: CollectionName.ROOM, timestamps: true, versionKey: false })
export class Room extends Document {
	@Prop()
	type: string;

	@Prop()
	view: string;

	@Prop()
	deleted?: boolean;

	@Prop()
	images: FilesCreateDto[];
}

export const RoomModelSchema = SchemaFactory.createForClass(Room);

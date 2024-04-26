import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CollectionName } from '../../constants/constants';

@Schema({ collection: CollectionName.ROOM, timestamps: true, versionKey: false })
export class Room extends Document {
	@Prop()
	type: string;

	@Prop()
	view: string;

	@Prop()
	deleted?: boolean;
}

export const RoomModelSchema = SchemaFactory.createForClass(Room);

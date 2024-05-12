import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { CollectionName } from '../../constants/constants';

@Schema({ collection: CollectionName.SCHEDULE, timestamps: true, versionKey: false })
export class Reservation extends Document {
	@Prop()
	startDate: Date;

	@Prop()
	endDate: Date;

	@Prop()
	roomId: ObjectId;

	@Prop()
	deleted?: boolean;
}

export const ReservationModelSchema = SchemaFactory.createForClass(Reservation);

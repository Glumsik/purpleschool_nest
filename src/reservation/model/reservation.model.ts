import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CollectionName } from '../../constants/constants';

@Schema({ collection: CollectionName.SCHEDULE, timestamps: true, versionKey: false })
export class Reservation extends Document {
	@Prop()
	id: number;

	@Prop()
	startDate: Date;

	@Prop()
	endDate: Date;

	@Prop()
	roomId: number;

	@Prop()
	deleted?: boolean;
}

export const ReservationModelSchema = SchemaFactory.createForClass(Reservation);

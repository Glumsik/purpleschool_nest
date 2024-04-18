import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CollectionName } from 'src/constants/constants';

@Schema({ collection: CollectionName.COUNTERS, versionKey: false })
export class Counter extends Document {
	@Prop({ required: true })
	type: string;

	@Prop({ required: true, default: 0 })
	current: number;
}

export const CounterModelSchema = SchemaFactory.createForClass(Counter);

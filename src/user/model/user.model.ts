import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CollectionName } from '../../constants/constants';

@Schema({ collection: CollectionName.USERS, timestamps: true, versionKey: false })
export class User extends Document {
	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop()
	name: string;

	@Prop()
	phone: string;

	@Prop({ default: ['user'] })
	roles: string[];
}

export const UserModelSchema = SchemaFactory.createForClass(User);

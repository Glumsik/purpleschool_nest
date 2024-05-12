import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { transformToDate } from '../../utils/helpers';

export class ReservationDto {
	@Transform(transformToDate)
	@IsDate()
	startDate: Date;

	@Transform(transformToDate)
	@IsDate()
	endDate: Date;

	@IsMongoId({ message: 'Значение roomId должно быть формата ObjectId' })
	@IsNotEmpty({ message: 'Значение roomId не может быть пустым' })
	roomId: ObjectId;
}

import { IsDate, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReservationDto {
	@Transform(({ value }) => {
		return new Date(value);
	})
	@IsDate()
	startDate: Date;

	@Transform(({ value }) => {
		return new Date(value);
	})
	@IsDate()
	endDate: Date;

	@Transform(({ value }) => {
		return Number(value);
	})
	@IsNumber()
	roomId: number;
}

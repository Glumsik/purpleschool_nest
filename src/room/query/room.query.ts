import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_COUNT_LIMIT, DEFAULT_OFFSET } from 'src/constants/constants';

export class RoomQuery {
	@Transform(({ value }) => {
		return value ? Number(value) : DEFAULT_COUNT_LIMIT;
	})
	@IsNumber()
	@IsOptional()
	limit: number = DEFAULT_COUNT_LIMIT;

	@Transform(({ value }) => {
		return value ? Number(value) : DEFAULT_OFFSET;
	})
	@IsNumber()
	@IsOptional()
	offset: number = DEFAULT_OFFSET;

	@IsString()
	@IsOptional()
	type: string;

	@IsString()
	@IsOptional()
	view: string;
}

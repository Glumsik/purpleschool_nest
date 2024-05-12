import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_COUNT_LIMIT, DEFAULT_OFFSET } from '../../constants/constants';
import { transformToNumber } from '../../utils/helpers';

export class RoomQuery {
	@Transform(transformToNumber || DEFAULT_COUNT_LIMIT)
	@IsNumber()
	@IsOptional()
	limit: number = DEFAULT_COUNT_LIMIT;

	@Transform(transformToNumber || DEFAULT_OFFSET)
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

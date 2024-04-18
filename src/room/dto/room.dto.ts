import { IsString } from 'class-validator';

export class RoomDto {
	@IsString()
	type: string;

	@IsString()
	view: string;
}

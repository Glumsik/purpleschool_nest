import { IsNotEmpty, IsString } from 'class-validator';

export class RoomDto {
	@IsString({ message: 'Значение type должно быть строкой' })
	@IsNotEmpty({ message: 'Поле type не может быть пустым' })
	type: string;

	@IsString({ message: 'Значение view должно быть строкой' })
	@IsNotEmpty({ message: 'Поле view не может быть пустым' })
	view: string;
}

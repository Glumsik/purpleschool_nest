import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { FilesCreateDto } from '../../files/dto/files.create.dto';

export class RoomDto {
	@IsString({ message: 'Значение type должно быть строкой' })
	@IsNotEmpty({ message: 'Поле type не может быть пустым' })
	type: string;

	@IsString({ message: 'Значение view должно быть строкой' })
	@IsNotEmpty({ message: 'Поле view не может быть пустым' })
	view: string;

	@IsArray({ message: 'Значение images должно быть массивом' })
	@IsNotEmpty({ message: 'Поле images не может быть пустым' })
	images: FilesCreateDto[];
}

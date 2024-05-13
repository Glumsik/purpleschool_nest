import { IsOptional, IsString } from 'class-validator';
import { Role } from '../../constants/constants';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	phone: string;

	@IsOptional()
	role: Role[];
}

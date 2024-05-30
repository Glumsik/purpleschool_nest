import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty({ message: 'Email должен быть заполнен' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'Пароль должен быть заполнен' })
	password: string;
}

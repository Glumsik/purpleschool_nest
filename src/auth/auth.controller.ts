import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() authDto: AuthDto): Promise<{ access_token: string }> {
		const { email } = await this.authService.validateUser(authDto);

		return this.authService.login(email);
	}
}

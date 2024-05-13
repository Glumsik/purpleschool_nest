import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from '../user/user.repository';
import { USER_STATUS } from '../constants/constants';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	async validateUser({ email, password }: AuthDto): Promise<{ email: string }> {
		const user = await this.userRepository.getByEmail(email);

		if (!user) throw new UnauthorizedException(USER_STATUS.NOT_EXISTS);

		const isCorrectPassword = await compare(password, user.passwordHash);

		if (!isCorrectPassword) throw new UnauthorizedException(USER_STATUS.INVALID_PASSWORD);

		return { email: user.email };
	}

	async login(email: string): Promise<{ access_token: string }> {
		const payload = { email };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}

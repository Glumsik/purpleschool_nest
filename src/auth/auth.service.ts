import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from '../user/user.repository';
import { USER_STATUS } from '../constants/constants';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import { User } from '../user/model/user.model';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	async validateUser({ email, password }: AuthDto): Promise<Pick<User, 'email' | '_id' | 'roles'>> {
		const user = await this.userRepository.getByEmail(email);

		if (!user) throw new UnauthorizedException(USER_STATUS.NOT_EXISTS);

		const isCorrectPassword = await compare(password, user.passwordHash);

		if (!isCorrectPassword) throw new UnauthorizedException(USER_STATUS.INVALID_PASSWORD);

		return { email: user.email, _id: user._id, roles: user.roles };
	}

	async login(payload: Pick<User, 'email' | '_id' | 'roles'>): Promise<{ access_token: string }> {
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}

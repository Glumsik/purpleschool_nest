import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModelSchema } from './model/user.model';
import { UserRepository } from './user.repository';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }])],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository],
})
export class UserModule {}

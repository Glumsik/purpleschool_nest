import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<{ uri: string; dbName: string }> => {
	const MONGO_HOST = '127.0.0.1';

	const UserDB = configService.get('DB_USERNAME') || 'purpleschool';
	const PasswordDB = configService.get('DB_PASSWORD') || 'purpleschool123';
	const Port = configService.get('DB_PORT') || 47018;

	return {
		uri: `mongodb://${UserDB}:${PasswordDB}@${MONGO_HOST}:${Port}?directConnection=true`,
		dbName: configService.get('mongoDatabase') || 'hotelDB',
	};
};

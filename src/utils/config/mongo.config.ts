import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<{ uri: string; dbName: string }> => {
	const mongoHost = configService.get('MONGO_HOST') || '127.0.0.1';
	const userDB = configService.get('DB_USERNAME') || 'purpleschool';
	const passwordDB = configService.get('DB_PASSWORD') || 'purpleschool123';
	const port = configService.get('DB_PORT') || 47018;

	return {
		uri: `mongodb://${userDB}:${passwordDB}@${mongoHost}:${port}?directConnection=true`,
		dbName: configService.get('mongoDatabase') || 'hotelDB',
	};
};

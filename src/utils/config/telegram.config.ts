import { ConfigService } from '@nestjs/config';

export const getConfigTelegram = async (configService: ConfigService) => {
	return {
		token: configService.get('TELEGRAM_TOKEN'),
	};
};

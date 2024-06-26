import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { getConfigTelegram } from '../utils/config/telegram.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		TelegrafModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getConfigTelegram,
		}),
	],
	providers: [TelegramService],
	exports: [TelegramService],
})
export class TelegramModule {}

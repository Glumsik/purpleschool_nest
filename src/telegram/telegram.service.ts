import { Context, Telegraf } from 'telegraf';
import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
	private readonly chatId: number;

	constructor(@InjectBot() private readonly bot: Telegraf<Context>, configService: ConfigService) {
		this.chatId = configService.get('TELEGRAM_CHAT_ID') || 0;
	}

	async sendMessage(text: string): Promise<void> {
		this.bot.telegram.sendMessage(this.chatId, text);
	}
}

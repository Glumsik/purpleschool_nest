import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../utils/decorators/role.decorator';
import { Role } from '../constants/constants';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) {}

	@Get(':month')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	async getStatistic(@Param('month') month: string) {
		return this.statisticService.getStatistic(month);
	}
}

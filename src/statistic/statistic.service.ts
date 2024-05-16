import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../reservation/reservation.repository';
import { STATISC } from '../constants/constants';

@Injectable()
export class StatisticService {
	constructor(private readonly reservationRepository: ReservationRepository) {}

	async getStatistic(monthName: string): Promise<{ _id: string; total: number }[]> {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const monthIndex = monthNames.findIndex(
			(name) => name.toLowerCase() === monthName.toLowerCase(),
		);

		if (monthIndex === -1) {
			throw new Error(STATISC.MONTH_ERROR);
		}

		const startDate = new Date(new Date().getFullYear(), monthIndex, 1);
		const endDate = new Date(new Date().getFullYear(), monthIndex + 1, 0);

		const query = [
			{
				$match: {
					startDate: {
						$gte: startDate,
						$lte: endDate,
					},
				},
			},
			{
				$group: {
					_id: '$roomId',
					intervals: {
						$push: {
							startDate: '$startDate',
							endDate: '$endDate',
						},
					},
				},
			},
			{
				$addFields: {
					days: {
						$map: {
							input: '$intervals',
							as: 'interval',
							in: {
								$function: {
									body: `function (interval) {
										const { startDate, endDate } = interval;
										return (endDate - startDate) / (1000 * 60 * 60 * 24);
									}`,
									args: ['$$interval'],
									lang: 'js',
								},
							},
						},
					},
				},
			},
			{
				$addFields: {
					total: {
						$reduce: {
							input: '$days',
							initialValue: 0,
							in: {
								$add: ['$$value', '$$this'],
							},
						},
					},
				},
			},
			{
				$project: {
					_id: 1,
					total: 1,
				},
			},
		];

		return this.reservationRepository.aggregate(query);
	}
}

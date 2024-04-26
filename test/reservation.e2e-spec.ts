import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { RoomDto } from '../src/room/dto/room.dto';
import { disconnect } from 'mongoose';
import { ReservationDto } from '../src/reservation/dto/reservation.dto';

const testRoom: RoomDto = {
	type: 'one-room',
	view: 'city',
};

const testReservation: ReservationDto = {
	startDate: new Date('2024-01-01'),
	endDate: new Date('2024-01-09'),
	roomId: 0,
};

describe('AppController e2e', () => {
	let app: INestApplication;
	let roomId: number;
	let reservationId: number;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('create room', async () => {
		return request(app.getHttpServer())
			.post('/room/create')
			.send(testRoom)
			.expect(201)
			.then(({ body }: request.Response) => {
				roomId = body._id;
				testReservation.roomId = body._id;
				expect(body.type).toBe('one-room');
				expect(body.view).toBe('city');
				expect(roomId).toBeDefined();
			});
	});

	it('get room', async () => {
		return request(app.getHttpServer())
			.get(`/room/${roomId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body._id).toBe(roomId);
				expect(body.type).toBe('one-room');
				expect(body.view).toBe('city');
			});
	});

	it('update room', async () => {
		return request(app.getHttpServer())
			.put(`/room/${roomId}`)
			.send({ view: 'mountains' })
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.view).toBe('mountains');
			});
	});

	it('delete room', async () => {
		return request(app.getHttpServer())
			.delete(`/room/${roomId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.deleted).toBe(true);
			});
	});

	it('create reservation', async () => {
		return request(app.getHttpServer())
			.post('/reservation/create')
			.send(testReservation)
			.expect(201)
			.then(({ body }: request.Response) => {
				reservationId = body._id;
				expect(body.startDate).toBeDefined();
				expect(body.endDate).toBeDefined();
				expect(reservationId).toBeDefined();
			});
	});

	it('get reservation', async () => {
		return request(app.getHttpServer())
			.get(`/reservation/${reservationId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body._id).toBe(reservationId);
			});
	});

	it('update reservation', async () => {
		return request(app.getHttpServer())
			.put(`/reservation/${reservationId}`)
			.send({ startDate: new Date('2024-01-01'), endDate: new Date('2024-01-10'), roomId })
			.expect(409);
	});

	it('delete reservation', async () => {
		return request(app.getHttpServer())
			.delete(`/reservation/${reservationId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.deleted).toBe(true);
			});
	});

	afterAll(async () => {
		await disconnect();
	});
});

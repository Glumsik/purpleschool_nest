import { Injectable } from '@nestjs/common';
import { FilesCreateDto } from './dto/files.create.dto';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
	private readonly PWD: string;

	constructor() {
		this.PWD = process.cwd();
	}

	async saveFiles(files: Array<Express.Multer.File>): Promise<FilesCreateDto[]> {
		const filesArray = [] as FilesCreateDto[];

		const filesPath = `${this.PWD}/uploads`;
		await ensureDir(filesPath);

		for await (const file of files) {
			const date = Date.now();
			const fileName = file.originalname.split('.');
			const newFileName = `${fileName[0]}.${date}.${fileName[1]}`;

			const newBuffer = await sharp(file.buffer).resize({ width: 500 }).toBuffer();

			await writeFile(`${filesPath}/${newFileName}`, newBuffer);

			filesArray.push({
				fileName: newFileName,
				fileUrl: `/uploads/${newFileName}`,
			});
		}

		return filesArray;
	}
}

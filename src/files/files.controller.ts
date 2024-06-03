import {
	Controller,
	HttpCode,
	Post,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Role } from '../constants/constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../utils/decorators/role.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesCreateDto } from './dto/files.create.dto';

@Controller('files')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('upload')
	@Roles(Role.ADMIN)
	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('files'))
	async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>): Promise<FilesCreateDto[]> {
		return this.filesService.saveFiles(files);
	}
}

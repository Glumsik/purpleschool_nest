import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
	imports: [
		ServeStaticModule.forRoot({ rootPath: `${process.cwd()}/uploads`, serveRoot: '/static' }),
	],
	providers: [FilesService],
	controllers: [FilesController],
})
export class FilesModule {}

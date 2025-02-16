import { Controller, Post, UploadedFile, UseInterceptors, Param, BadRequestException, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload/:employeeId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('employeeId') employeeId: number,
  ) {
    if (!file) {
      throw new BadRequestException('No se subió ningún archivo');
    }

    if (!employeeId) {
      throw new BadRequestException('El employeeId es requerido');
    }

    return this.documentsService.uploadFile(file, +employeeId);
  }
  @Get(':employeeId')
  async getDocuments(@Param('employeeId') employeeId: number) {
    return this.documentsService.getDocuments(Number(employeeId));
  }
}

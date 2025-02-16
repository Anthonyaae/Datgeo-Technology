import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmployeeDocument } from 'src/employeeDocument/EmployeeDocument.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentsService {
  private readonly employeeDocumentRepository: Repository<EmployeeDocument>
  async uploadFile(file: Express.Multer.File, employeeId: number) {
    try {
      if (!file) {
        throw new Error('Archivo no recibido');
      }

      if (!employeeId) {
        throw new Error('ID de empleado no proporcionado');
      }

      return {
        message: 'Archivo subido exitosamente',
        fileUrl: file.path,
      };
    } catch (error) {
      console.error('Error en uploadFile:', error);
      throw new InternalServerErrorException(error.message || 'Error interno del servidor');
    }
  }
  async getDocuments(employeeId: number) {
    try {
      if (!employeeId) {
        throw new BadRequestException('ID de empleado no proporcionado');
      }

      const documents = await this.employeeDocumentRepository.find({
        where: { employee: { id: employeeId } },
      });

      return documents;
    } catch (error) {
      console.error('Error en getDocuments:', error);
      throw new InternalServerErrorException('Error al obtener los documentos');
    }
  }
  
}

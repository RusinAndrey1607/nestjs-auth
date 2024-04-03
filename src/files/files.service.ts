import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
    async createFile(file):Promise<string>{
        try {
            return '';
        } catch (error) {
            throw new HttpException("An error occurred while writing the file",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

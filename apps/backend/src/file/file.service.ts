import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { join } from 'path';
import { allowedFileTypes, folders } from 'src/constants';
import config from 'src/constants/config';
import { FilesType } from 'src/types';
import { FileDto } from 'src/utils/dto/file.dto';
import { uploadFile } from 'src/utils/upload';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async createFile(file: FileDto, type: FilesType) {
    const uploadedFile = await file.file;
    if (!allowedFileTypes[type].includes(uploadedFile.mimetype)) {
      const errorMessage =
        type === 'VIDEOS'
          ? 'File needs to be a video'
          : 'File needs to be an image';
      throw new BadRequestException(errorMessage);
    }

    const fileExtenstion = uploadedFile.filename
      .slice(uploadedFile.filename.lastIndexOf('.'))
      .toLowerCase();
    const fileName = `${uuid.v4()}${fileExtenstion}`;
    const uploadDir = join(
      this.configService.get(config.STATIC_PATH),
      folders[type],
    );

    const fileSize = await uploadFile(
      uploadedFile.createReadStream,
      uploadDir,
      fileName,
    );

    return { fileSize, fileName };
  }

  async deleteFile(dir: string, filename: string) {
    const filePath = join(dir, filename);

    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}

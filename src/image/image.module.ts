import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from './image.controller';

@Module({
  // Comment the import part to disable the bug
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [ImageController],
})
export class ImageModule {}

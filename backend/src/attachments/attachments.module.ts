import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';

@Module({
  providers: [AttachmentsService],
  controllers: [AttachmentsController],
  imports: [TypeOrmModule.forFeature([Attachment])],

})
export class AttachmentsModule { }

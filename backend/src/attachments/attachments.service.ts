import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentsService {
    constructor(
        @InjectRepository(Attachment)
        private attachmentsRepository: Repository<Attachment>,
    ) { }
    async getAttachment(attachmentId: number) {

        const attachment = await this.attachmentsRepository.findOne({ where: { id: attachmentId } });
        if (!attachment) {
            throw new NotFoundException(`Attachment not found`);
        }
        return attachment;
    }

    async remove(attachmentId: number): Promise<void> {
        const result = await this.attachmentsRepository.delete(attachmentId);
        if (result.affected === 0) {
            throw new NotFoundException(`Attachment not found`);
        }
    }
}

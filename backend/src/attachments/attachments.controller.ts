import { Controller, Delete, Get, Param, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { createReadStream } from 'fs';
import { AttachmentsService } from './attachments.service';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
@Controller('attachments')
@UseGuards(JwtAuthGuard)
export class AttachmentsController {
    constructor(private readonly attachmentsService: AttachmentsService) { }

    @Get(':id')
    async getAttachment(@Param('id') id: string): Promise<StreamableFile> {
        const attachment = await this.attachmentsService.getAttachment(+id);
        const file = createReadStream(attachment.path);

        return new StreamableFile(file, {
            disposition: `attachment; filename="${attachment.originalname}"`,
            type: attachment.contentType,
        });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.attachmentsService.remove(+id);
    }
}

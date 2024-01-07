
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('hasUsers')
    async hasUsers() {
        return { hasUsers: await this.usersService.hasUsers() };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Request() req) {
        const user = await this.usersService.findOne(req.user.email);
        const { password, ...fields } = user;
        return fields;
    }
}

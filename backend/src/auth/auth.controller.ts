import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './localAuth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private configService: ConfigService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    if (await this.usersService.hasUsers()) {
      const allowSignUp = this.configService.get<boolean>("ALLOW_REGISTER")
      if (!allowSignUp) {
        throw new HttpException(
          "Registering is disabled.",
          HttpStatus.FORBIDDEN
        )
      }
    }
    const existing = await this.usersService.findOne(user.email);
    if (existing) {
      throw new HttpException(
        'User with this email exists.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const created = await this.usersService.create(user);
    const { password, ...fields } = created;
    return fields;
  }
}

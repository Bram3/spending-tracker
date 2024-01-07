import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOneBy({ email: email });
    }
    async hasAdmin() {
        const users = await this.all();
        const admins = users.filter((user) => {
            return user.isAdmin;
        });
        return admins.length > 0;
    }
    async hasUsers() {
        const users = await this.all();
        return users.length > 0;
    }
    async create(userDto: CreateUserDto): Promise<User | undefined> {
        userDto.password = await bcrypt.hash(userDto.password, 10);
        const user = new User();
        Object.assign(user, userDto);
        user.isAdmin = !(await this.hasAdmin());

        return this.userRepository.save(user);
    }

    async all(): Promise<User[] | undefined> {
        return await this.userRepository.find();
    }
}

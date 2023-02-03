import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { verifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post()
	async createUser(@Body() dto: CreateUserDto): Promise<void> {
		const { name, email, password } = dto;
		await this.usersService.createUser(name, email, password);
		console.log(dto);
	}

	@Post('/email-verify')
	async verifyEmail(@Query() dto: verifyEmailDto): Promise<string> {
		console.log(dto);
		return ;
	}

	@Post('/login')
	async login(@Body() dto: UserLoginDto): Promise<string> {
		console.log(dto);
		return ;
	}

	@Get('/:id')
	async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
		console.log(userId);
		return ;
	}
}

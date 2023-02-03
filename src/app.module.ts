import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { IndexModule } from './index/index.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';

@Module({
	imports: [
		LoginModule,
		IndexModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.PSQL_HOST,
			port: Number(process.env.PSQL_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			synchronize: true,
			// 데이터 베이스에서 모듈의 현재상태로 마이크레이션
			logging: false,
			entities: ['dist/**/*.entity.{ts,js}'],
		}),
	],
	controllers: [UsersController],
	providers: [UsersService, EmailService],
})
export class AppModule {}

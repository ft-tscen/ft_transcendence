import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { IndexModule } from './index/index.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		LoginModule,
		IndexModule,
		UserModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.PSQL_HOST,
			port: Number(process.env.PSQL_PORT),
			username: process.env.PSQL_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.PSQL_DB,
			synchronize: true,
			// 데이터 베이스에서 모듈의 현재상태로 마이크레이션
			logging: false,
			entities: ['dist/**/*.entity.{ts,js}'],
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

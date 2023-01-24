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
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: '1436',
			database: 'tscen',
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

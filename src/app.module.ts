import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { IndexModule } from './index/index.module';

@Module({
	imports: [LoginModule, IndexModule],
	controllers: [],
	providers: [],
})
export class AppModule {}

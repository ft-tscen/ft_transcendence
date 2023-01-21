import { Controller, Get, Res } from '@nestjs/common';

@Controller('/')
export class IndexController {
	@Get()
	redicetLogin(@Res() res) {
		// 로그인이 안됐으면
		res.status(302).redirect('/login');
	}
}

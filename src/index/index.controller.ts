import { Controller, Get, Res } from '@nestjs/common';

@Controller('/')
export class IndexController {
	@Get()
	redicetLogin(@Res() res) {
		res.status(302).redirect('/login');
	}
}

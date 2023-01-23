import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('/')
export class IndexController {
	@Get()
	redicetLogin(@Req() req: Request, @Res() res: Response) {
		const session: any = req.session;
		// 로그인 되었으면
		if (session.login === true) {
			const intra = session.intra;
			const name = session.name;
			console.log('login success');
			res.send({ intra, name });
		} else {
			res.status(302).redirect('/login');
		}
	}
}

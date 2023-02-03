import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/')
export class IndexController {

	@Get()
	@Redirect('/', 302)
	Login(@Req() req: Request) {
		const session: any = req.session;
		// 로그인 되었으면
		if (session.login === true) {
			console.log('login success');
			return { url: '/home'};
		}
		else {
			return { url: '/login'};
		}
	}
}

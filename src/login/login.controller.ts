import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { error } from 'console';
import { Request, Response } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
	private URL_BASE = 'https://api.intra.42.fr/v2/';
	private LOGIN_JSON;
	private TOKEN;
	private errorCounter = 0;

	constructor(private loginService: LoginService) {}

	@Get()
	loginStart(@Res() res: Response) {
		this.loginService.oauth(res);
	}
	@Get('/redirect')
	async loginRedirect(
		@Req() req: Request,
		@Res() res: Response,
		@Query('code') code,
	) {
		try {
			this.TOKEN = await this.loginService.getToken(
				process.env.UID,
				process.env.SECRET,
				code,
			);
			this.LOGIN_JSON = await this.loginService.getMeJson(
				this.URL_BASE,
				this.TOKEN,
			);
			const session: any = req.session;
			session.login = true;
			session.intra = this.LOGIN_JSON.login;
			session.name = this.LOGIN_JSON.usual_full_name;
			// 이름이나 인트라명 안불러와지면 에러
			if (session.intra === undefined || session.name === undefined)
				throw new error();
			console.log(
				'intra: ',
				this.LOGIN_JSON.login,
				' name: ',
				this.LOGIN_JSON.usual_full_name,
			);
			this.errorCounter = 0;
			res.status(302).redirect('/');
		} catch (error) {
			console.log(error);
			this.errorCounter += 1;
			console.log('counter: ', this.errorCounter);
			// 다시 로그인 인증하고 토큰받기 5번까지
			if (this.errorCounter < 5) {
				res.status(302).redirect('/login');
			} else {
				res.status(500).end();
			}
		}
	}
}

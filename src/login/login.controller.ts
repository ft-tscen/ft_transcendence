import { Controller, Get, Query, Res } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
	private UID =
		'u-s4t2ud-f56ffffe5da02f0a5b72cc17bc390f649cb9489915308f6447ffe7c80feb1f53';
	private SECRET =
		'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';
	constructor(private loginService: LoginService) {}

	@Get()
	loginStart(@Res() res) {
		this.loginService.oauth(res);
	}
	@Get('/redirect')
	async loginRedirect(@Query('code') code) {
		const json = this.loginService.getToken(this.UID, this.SECRET, code);
		return json;
	}
}

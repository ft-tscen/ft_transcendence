import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LoginService {
	oauth(res: Response) {
		return res.status(302).redirect(process.env.OAUTH_URL);
	}

	async getToken(uid: string, secret: string, code: string) {
		const queryString: string =
			'' +
			'grant_type=' +
			'authorization_code' +
			'&' +
			'client_id=' +
			uid +
			'&' +
			'client_secret=' +
			secret +
			'&' +
			'code=' +
			code +
			'&' +
			'redirect_uri=' +
			'http://localhost:3000/login/redirect' +
			'&' +
			'scope=public';

		const res = await fetch('https://api.intra.42.fr/oauth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-Mobile': 'false',
			},
			body: queryString,
		});
		const ret = await res.json();
		console.log(ret);
		return ret.access_token;
	}

	async getMeJson(baseUrl: string, token: string) {
		const res = await fetch(baseUrl + 'me', {
			method: 'GET',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
		return res.json();
	}
}

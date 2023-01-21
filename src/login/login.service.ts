import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
	private OAUTH_URL =
		'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-f56ffffe5da02f0a5b72cc17bc390f649cb9489915308f6447ffe7c80feb1f53&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2Fredirect&response_type=code';

	oauth(res: any) {
		return res.status(302).redirect(this.OAUTH_URL);
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

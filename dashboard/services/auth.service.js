import Request from './HandleRequest';
import { JwtService } from './jwt.service';

export async function postLogin(inputs) {
  const request = new Request();
  const { data, status } = await request
    .post('/auth/login', inputs)
    .catch(({ response }) => response);
  if (status === 201) {
    await JwtService.storeToken(data.accessToken);
  }

  if (status === 401) {
    return data.message;
  }
}

export async function logout() {
  await JwtService.deleteToken();
}

export function isAdmin(auth) {
  if (!auth) {
    return false;
  }

  return auth.decodedToken.user.isAdmin === 1;
}

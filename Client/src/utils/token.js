const REFRESH_TOKEN_KEY = 'refresh-token';

export function getToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setToken(token) {
  return localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function deleteToken() {
  return localStorage.removeItem(REFRESH_TOKEN_KEY);
}

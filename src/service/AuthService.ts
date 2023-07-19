const TOKEN_KEY = "auth-token";

class AuthService {
  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken(): string {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
    return "";
  }

  static deleteToken(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

export default AuthService;

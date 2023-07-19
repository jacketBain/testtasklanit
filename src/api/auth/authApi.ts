import axios from "axios";
import { BASE_URL } from "../http";
import { IUser } from "./interface";

export default class AuthApi {
  static async getAuth(token: string): Promise<IUser> {
    try {
      const url = `${BASE_URL}/user`;
      const resp = await axios.get<IUser>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.data;
    } catch (err) {
      throw err;
    }
  }
}

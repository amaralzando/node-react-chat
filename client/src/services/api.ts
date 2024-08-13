import axios from "axios";
import { parseCookies } from "nookies";

const { "frontbasic2.token": token } = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

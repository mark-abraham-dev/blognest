import axios from "axios";
import { AuthResponse, User } from "../types";

const API_URL = `${process.env.REACT_APP_BASE_URL}/auth`;

export const signup = (user: User) => {
  return axios.post(`${API_URL}/signup`, user);
};

export const login = (user: User) => {
  return axios.post<AuthResponse>(`${API_URL}/signin`, user);
};

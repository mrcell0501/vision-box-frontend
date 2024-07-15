import axios from "axios";
import { User } from "../types/user";
import { CreateUser } from "../types/create-user";

const api = axios.create({
  baseURL: process.env.REACT_APP_USERS_API_HOST,
});

export const getUsers = async () => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const createUser = async (payload: CreateUser) => {
  const response = await api.post<User>("/users", payload);
  return response.data;
};

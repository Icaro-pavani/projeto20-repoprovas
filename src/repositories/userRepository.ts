import { User } from "@prisma/client";
import { prisma } from "../config/database.js";

export interface CreateUserData extends Omit<User, "id"> {
  passwordConfirmation: string;
}

type UserData = Omit<User, "id">;

export async function createUser(userData: UserData) {
  return prisma.user.create({ data: userData });
}

export async function findByEmail(email: string) {
  return prisma.user.findFirst({ where: { email } });
}

export async function findById(id: number) {
  return prisma.user.findFirst({ where: { id } });
}

export async function findAll() {
  return prisma.user.findMany({});
}

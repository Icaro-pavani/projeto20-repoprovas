import { User } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateUserData = Omit<User, "id">;

export async function createUser(userData: CreateUserData) {
  return prisma.user.create({ data: userData });
}

export async function findByEmail(email: string) {
  return prisma.user.findFirst({ where: { email } });
}

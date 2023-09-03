import { User } from '../interface';
import { prisma } from '../db';

const getUser = async (phone: string) => {
  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) return null;

  return user;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return null;

  return user;
};

const createUser = async (user: User) => prisma.user.create({ data: user });

const deleteUser = async (user_id: string) =>
  prisma.user.delete({ where: { id: user_id } });

const getAllUser = async () => prisma.user.findMany();

export { getUser, getUserById, createUser, getAllUser, deleteUser };

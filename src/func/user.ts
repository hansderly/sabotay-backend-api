import { User } from '@prisma/client';
import { prisma } from '../db';

const getUserFunc = (phone: string) => {
  const user = prisma.user.findUnique({ where: { phone } });

  if (!user) return null;

  return user;
};

const createUserFunc = (user: User) => {
  prisma.user.create({ data: user });
};

export { getUserFunc, createUserFunc };

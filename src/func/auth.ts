import { prisma } from '../db';

const getUserFunc = (phone: string) => {
  const user = prisma.user.findUnique({ where: { phone } });

  if (!user) return null;

  return user;
};

export { getUserFunc };

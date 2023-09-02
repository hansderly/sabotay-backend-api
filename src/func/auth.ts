import bcrypt from 'bcrypt';
import { prisma } from '../db';
import { User, Organizer } from '../interface';

const hashPassword = (passowrd: string, saltRouds: number) =>
  bcrypt.hashSync(passowrd, saltRouds);

const comparePassword = (plainPassword: string, hashPassword: string) =>
  bcrypt.compareSync(plainPassword, hashPassword);

const getOrganizerFunc = (username: string) => {
  const organizer = prisma.organizer.findUnique({ where: { username } });

  if (!organizer) return null;

  return organizer;
};

const createOrganizerFunc = async (organizer: Organizer, user: User) => {
  const organizerData = { create: organizer };

  await prisma.user.create({
    data: { ...user, Organizer: organizerData },
    include: { Organizer: true },
  });
};

export { getOrganizerFunc, createOrganizerFunc };

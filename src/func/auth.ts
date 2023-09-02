import bcrypt from 'bcrypt';
import { prisma } from '../db';
import { User, Organizer } from '../interface';

const hashPassword = (passowrd: string, saltRouds: number) =>
  bcrypt.hashSync(passowrd, saltRouds);

const comparePassword = (plainPassword: string, hashPassword: string) =>
  bcrypt.compareSync(plainPassword, hashPassword);

const getOrganizer = (username: string) => {
  const organizer = prisma.organizer.findUnique({ where: { username } });

  if (!organizer) return null;

  return organizer;
};

const createOrganizer = async (organizer: Organizer) => {
  const hash = hashPassword(organizer.password, 10);

  await prisma.user.create({
    data: {
      first_name: organizer.first_name,
      last_name: organizer.last_name,
      phone: organizer.phone,
      Organizer: {
        create: {
          username: organizer.username,
          email: organizer.email,
          password: hash,
        },
      },
    },
    include: { Organizer: true },
  });
};

export { getOrganizer, createOrganizer };

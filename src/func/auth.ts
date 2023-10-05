import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import { Organizer } from '../interface';

type Payload = {
  _id: string;
  iss: string;
  role: string;
  iat: number;
};

type JWTError =
  | jwt.JsonWebTokenError
  | jwt.TokenExpiredError
  | jwt.NotBeforeError;

type User = {
  id: string;
  username: string;
  role: string;
};

const generateToken = (user: User) => {
  const secret = process.env.JWT_SECRET!;
  const payload = {
    _id: user.id,
    iss: user.username,
    role: user.role,
  };

  return jwt.sign(payload, secret);
};

const decodeToken = (token: string) => {
  const secret = process.env.JWT_SECRET!;
  try {
    return { valid: true, ...(jwt.verify(token, secret) as Payload) };
  } catch (err) {
    return {
      valid: false,
      name: (err as JWTError).name,
      message: (err as JWTError).message,
    };
  }
};

const hashPassword = (passowrd: string, saltRouds: number) =>
  bcrypt.hashSync(passowrd, saltRouds);

const getHashPassword = async (username: string) => {
  const organizer = await getOrganizer(username);
  return organizer!.password;
};

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
      role: 'ADMIN',
      organizer: {
        create: {
          username: organizer.username,
          email: organizer.email,
          password: hash,
        },
      },
    },
    include: { organizer: true },
  });
};

export {
  generateToken,
  decodeToken,
  getOrganizer,
  createOrganizer,
  comparePassword,
  getHashPassword,
};

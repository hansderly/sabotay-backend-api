import { RequestHandler } from 'express';
import { Organizer } from '../interface';
import {
  getOrganizer,
  createOrganizer,
  comparePassword,
  getHashPassword,
} from '../func/auth';

interface Login {
  username: string;
  password: string;
}

const register: RequestHandler = async (req, res) => {
  const input: Organizer = req.body;
  const isOrganizerExist = await getOrganizer(input?.username);

  if (isOrganizerExist)
    return res.status(409).json({ message: 'User already exist' });

  await createOrganizer(input);
  return res.status(201).json({ message: 'User created successfully' });
};

const login: RequestHandler = async (req, res) => {
  const input: Login = req.body;
  const isOrganizerExist = await getOrganizer(input?.username);

  if (!isOrganizerExist)
    return res.status(401).json({ message: 'No user with that username' });

  const isPasswordMatch = comparePassword(
    input.password,
    await getHashPassword(input.username)
  );

  if (!isPasswordMatch)
    return res.status(401).json({ message: 'Password incorrect' });

  return res.status(200).json({ message: 'User login successfully' });
};

export { register, login };

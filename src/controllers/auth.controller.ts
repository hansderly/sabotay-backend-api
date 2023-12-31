import { RequestHandler } from 'express';
import ErrorAPI from '../utils/error';
import { Organizer } from '../interface';
import {
  getOrganizer,
  createOrganizer,
  comparePassword,
  generateToken,
} from '../func/auth';

interface Login {
  username: string;
  password: string;
}

const register: RequestHandler = async (req, res, next) => {
  const input: Organizer = req.body;
  try {
    const isOrganizerExist = await getOrganizer(input?.username);
    if (isOrganizerExist)
      return res.status(409).json({ message: 'User already exist' });

    await createOrganizer(input);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    const err = new ErrorAPI( 'Something went wrong while creating the organizer');
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  const input: Login = req.body;
  try {
    const organizer = await getOrganizer(input?.username);
    if (!organizer)
      return res.status(401).json({ message: 'No user with that username' });

    const isPasswordMatch = comparePassword(input.password, organizer.password);

    if (!isPasswordMatch)
      return res.status(401).json({ message: 'Password incorrect' });

    const payload = {
      id: organizer.id,
      username: organizer.username,
      role: 'ADMIN',
    };
    const token = generateToken(payload);

    return res.status(200).json({ message: 'User login successfully', token });
  } catch (error) {
    const err = new ErrorAPI('Something went wrong while logging the organizer');
    next(err);
  }
};

export { register, login };

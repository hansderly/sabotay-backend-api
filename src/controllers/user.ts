import { RequestHandler } from 'express';
import {
  getUser,
  getUserById,
  createUser,
  deleteUser as removeUser,
  getAllUser,
} from '../func/user';
import { User } from '../interface';

const addUser: RequestHandler = async (req, res) => {
  const input: User = req.body;
  const isUserExist = await getUser(input.phone);
  if (isUserExist)
    return res.status(409).json({ message: 'User already exist' });

  await createUser(input);
  return res.status(201).json({ message: 'User created successfully' });
};

const getUserDetail: RequestHandler = async (req, res) => {
  const { user_id } = req.params;
  const user = await getUserById(user_id);
  return res.status(200).json({ message: 'User found successfully', user });
};

const deleteUser: RequestHandler = async (req, res) => {
  const { user_id } = req.params;
  await removeUser(user_id);
  return res.status(200).json({ message: 'User delete successfully' });
};

const userList: RequestHandler = async (req, res) => {
  const users = await getAllUser();
  if (!users.length)
    return res.status(200).json({ message: 'No user yet', users });

  return res
    .status(200)
    .json({ message: 'List of group', groupCount: users.length, users });
};

export { addUser, getUserDetail, userList, deleteUser };

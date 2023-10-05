import { RequestHandler } from 'express';
import {
  getUser,
  getUserById,
  createUser,
  deleteUser as removeUser,
  getAllUser,
} from '../func/user';
import { User } from '../interface';
import ErrorAPI from '../utils/error';

const addUser: RequestHandler = async (req, res, next) => {
  const input: User = req.body;

  try {
    const isUserExist = await getUser(input.phone);
    if (isUserExist)
      return res.status(409).json({ message: 'User already exist' });

    await createUser(input);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    const err = new ErrorAPI('Something went wrong while adding the user');
    next(err);
  }
};

const getUserDetail: RequestHandler = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const user = await getUserById(user_id);
    return res.status(200).json({ message: 'User found successfully', user });
  } catch (error) {
    const err = new ErrorAPI('Something went wrong while getting the user');
    next(err);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    await removeUser(user_id);
    return res.status(200).json({ message: 'User delete successfully' });
  } catch (error) {
    const err = new ErrorAPI('Something went wrong while deleting the user');
    next(err);
  }
};

const userList: RequestHandler = async (req, res, next) => {
try {
  const users = await getAllUser();
  if (!users.length)
    return res.status(200).json({ message: 'No user yet', users });
  
  return res
    .status(200)
    .json({ message: 'List of group', groupCount: users.length, users });
} catch (error) {
    const err = new ErrorAPI('Something went wrong while getting the user list');
    next(err);
}

};

export { addUser, getUserDetail, userList, deleteUser };

import { RequestHandler } from 'express';
import { getUserById } from '../func/user';
import { getMember } from '../func/group-member';
import { GroupMember } from '../interface';

const checkUser: RequestHandler = async (req, res, next) => {
  const { user_id } = req.params;
  const user = await getUserById(user_id);
  if (!user) return res.status(200).json({ message: 'This user is not exit' });

  next();
};

const checkMember: RequestHandler = async (req, res, next) => {
  const member = req.params as unknown as GroupMember;
  const isExist = await getMember(member);
  if (!isExist)
    return res.status(200).json({ message: 'This user in not in the group' });

  next();
};

export { checkUser, checkMember };

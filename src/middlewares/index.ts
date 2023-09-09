import { RequestHandler } from 'express';
import { getUserById } from '../func/user';
import { getMember } from '../func/group-member';
import { GroupMember } from '../interface';
import { getgroupById } from '../func/group';

const checkUser: RequestHandler = async (req, res, next) => {
  const user_id = req.params.user_id || req.body.user_id;
  const user = await getUserById(user_id);
  if (!user) return res.status(200).json({ message: 'This user does not exit' });

  next();
};

const checkMember: RequestHandler = async (req, res, next) => {
  const member = req.params as unknown as GroupMember;
  const isExist = await getMember(member);
  if (!isExist)
    return res.status(200).json({ message: 'This user in not in the group' });

  next();
};

const checkGroup: RequestHandler = async (req, res, next) => {
  const group_id = req.params.group_id || req.body.group_id;
  const group = await getgroupById(group_id);
  if (!group)
    return res.status(401).json({ message: 'This group does not exist' });

  next();
};
export { checkUser, checkMember, checkGroup };

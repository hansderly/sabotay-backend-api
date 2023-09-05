import { RequestHandler } from 'express';
import {
  addMemberToGroup,
  deleteMember,
  getMember,
  listMemmberGroup,
} from '../func/group-member';
import { GroupMember } from '../interface';

const addMember: RequestHandler = async (req, res) => {
  const { group_id } = req.params;
  const { user_id } = req.body;

  const isAlready = await getMember({ user_id, group_id });
  if (isAlready)
    return res.status(409).json({ message: 'User already in group' });

  await addMemberToGroup({ user_id, group_id });
  return res.status(201).json('User added to group successfully');
};

const listMember: RequestHandler = async (req, res) => {
  const { group_id } = req.params;
  const members = await listMemmberGroup(group_id);
  if (!members.length)
    return res
      .status(200)
      .json({ message: 'No members in that group yet', members });

  return res.status(200).json({ message: 'List group members', members });
};

const deleteMemberFromGroup: RequestHandler = async (req, res) => {
  const member = req.params as unknown as GroupMember;
  const isExist = await getMember(member);
  if (!isExist)
    return res.status(200).json({ message: 'This user in not in the group' });

  await deleteMember(member);
  return res
    .status(200)
    .json({ message: 'User remove from the group successfully' });
};

export { addMember, listMember, deleteMemberFromGroup };

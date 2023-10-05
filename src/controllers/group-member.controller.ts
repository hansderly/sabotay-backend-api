import { RequestHandler } from 'express';
import {
  addMemberToGroup,
  deleteMember,
  getMember,
  listMemmberGroup,
} from '../func/group-member';
import { GroupMember } from '../interface';

const addMember: RequestHandler = async (req, res, next) => {
  const { group_id } = req.params;
  const { user_id } = req.body;

  try {
    const isAlready = await getMember({ user_id, group_id });
    if (isAlready)
      return res.status(409).json({ message: 'User already in group' });

    await addMemberToGroup({ user_id, group_id });
    return res
      .status(201)
      .json({ message: 'User added to group successfully' });
  } catch (error) {
    const err = new Error('Something went wrong while adding a member');
    (err as any).status = 500;
    next(err);
  }
};

const listMember: RequestHandler = async (req, res, next) => {
  const { group_id } = req.params;
  try {
    const members = await listMemmberGroup(group_id);
    if (!members.length)
      return res
        .status(200)
        .json({ message: 'No members in that group yet', members });

    return res.status(200).json({ message: 'List group members', members });
  } catch (error) {
    const err = new Error('Something went wrong while listing members');
    (err as any).status = 500;
    next(err);
  }
};

const deleteMemberFromGroup: RequestHandler = async (req, res, next) => {
  const member = req.params as unknown as GroupMember;

  try {
    await deleteMember(member);
    return res
      .status(200)
      .json({ message: 'User remove from the group successfully' });
  } catch (error) {
    const err = new Error('Something went wrong while deleting the member');
    (err as any).status = 500;
    next(err);
  }
};

export { addMember, listMember, deleteMemberFromGroup };

import { prisma } from '../db';
import { GroupMember } from '../interface';

const getMember = async (groupMember: GroupMember) => {
  const member = await prisma.groupMembers.findUnique({ where: groupMember });

  return member;
};

const addMemberToGroup = async (groupMember: GroupMember) => {
  const data = { user_id: groupMember.user_id, group_id: groupMember.group_id };
  await prisma.groupMembers.create({ data });
};

const listMemmberGroup = async (group_id: string) =>
  prisma.groupMembers.findMany({ where: { group_id }, select: { User: true } });

const deleteMember = async (groupMember: GroupMember) => {
  await prisma.groupMembers.delete({ where: groupMember });
};

export { getMember, addMemberToGroup, listMemmberGroup, deleteMember };

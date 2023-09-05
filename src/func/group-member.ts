import { prisma } from '../db';
import { GroupMember } from '../interface';

const getMember = async (groupMember: GroupMember) => {
  const member = await prisma.groupMember.findUnique({ where: groupMember });

  return member;
};

const addMemberToGroup = async (groupMember: GroupMember) => {
  const data = { user_id: groupMember.user_id, group_id: groupMember.group_id };
  await prisma.groupMember.create({ data });
};

const listMemmberGroup = async (group_id: string) =>
  prisma.groupMember.findMany({ where: { group_id }, select: { User: true } });

const deleteMember = async (groupMember: GroupMember) => {
  await prisma.groupMember.delete({ where: groupMember });
};

export { getMember, addMemberToGroup, listMemmberGroup, deleteMember };

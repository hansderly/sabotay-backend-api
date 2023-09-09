import { prisma } from '../db';
import { GroupMember } from '../interface';

const getMember = async ({ user_id, group_id }: GroupMember) => {
  const alias = `${user_id}-${group_id}`;
  const member = await prisma.groupMember.findUnique({ where: { alias } });

  return member;
};

const addMemberToGroup = async ({ user_id, group_id }: GroupMember) => {
  const alias = `${user_id}-${group_id}`;
  const data = { alias, user_id, group_id };
  await prisma.groupMember.create({ data });
};

const listMemmberGroup = async (group_id: string) =>
  prisma.groupMember.findMany({ where: { group_id }, select: { user: true } });

const deleteMember = async ({ user_id, group_id }: GroupMember) => {
  const alias = `${user_id}-${group_id}`;
  await prisma.groupMember.delete({ where: { alias } });
};

export { getMember, addMemberToGroup, listMemmberGroup, deleteMember };

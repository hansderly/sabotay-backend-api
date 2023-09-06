import { prisma } from '../db';
import { GroupMember } from '../interface';

const getContribution = async (id: string) =>
  prisma.contribution.findUnique({ where: { id } });

const addContribution = async ({ user_id, group_id }: GroupMember) => {
  const contribution_date = '2023-08-29T12:00:00.000Z';
  await prisma.contribution.create({
    data: { user_id, group_id, contribution_date },
  });
};

const listGroupContribution = async (group_id: string) => {
  const contributions = await prisma.contribution.findMany({
    where: { group_id },
    select: {
      user: true,
    },
  });

  return contributions;
};

const deleteContribution = async (id: string, group_id: string) => {
  await prisma.contribution.delete({ where: { id, group_id } });
};

export {
  getContribution,
  addContribution,
  listGroupContribution,
  deleteContribution,
};

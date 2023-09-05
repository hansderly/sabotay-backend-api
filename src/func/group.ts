import { prisma } from '../db';

import { Group } from '../interface';

const getgroup = async (name: string) =>
  prisma.group.findUnique({ where: { name } });

const getgroupById = async (id: string) =>
  prisma.group.findUnique({ where: { id } });

const createNewGroup = async (group: Group) =>
  prisma.group.create({ data: group });

const getListGroup = async () => prisma.group.findMany();

const deleteThisGroup = async (id: string) =>
  prisma.group.delete({ where: { id } });

export {
  getgroupById,
  getgroup,
  createNewGroup,
  getListGroup,
  deleteThisGroup,
};

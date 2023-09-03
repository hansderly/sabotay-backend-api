import { prisma } from '../db';

import { Group } from '../interface';

const getgroup = async (name: string) =>
  prisma.groups.findUnique({ where: { name } });

const getgroupById = async (id: string) =>
  prisma.groups.findUnique({ where: { id } });

const createNewGroup = async (group: Group) =>
  prisma.groups.create({ data: group });

const getListGroup = async () => prisma.groups.findMany();

const deleteThisGroup = async (id: string) =>
  prisma.groups.delete({ where: { id } });

export {
  getgroupById,
  getgroup,
  createNewGroup,
  getListGroup,
  deleteThisGroup,
};

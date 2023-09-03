import { Cycle } from '@prisma/client';
import { RequestHandler } from 'express';

import {
  getgroup,
  getgroupById,
  createNewGroup,
  getListGroup,
  deleteThisGroup,
} from '../func/group';
import { Group } from '../interface';

const createGroup: RequestHandler = async (req, res) => {
  const input: Group = req.body;
  const { cycle } = input;

  if (!Cycle[cycle])
    return res.status(422).json({ message: 'Wrong cycle value' });

  const isGroupExist = await getgroup(input.name);
  if (isGroupExist)
    return res.status(409).json({ message: 'Group already exist' });

  await createNewGroup(input);
  return res.status(201).json({ message: 'Group created successfully' });
};

const groupDetail: RequestHandler = async (req, res) => {
  const { group_id } = req.params;
  const group = await getgroupById(group_id);

  if (!group)
    return res.status(200).json({ message: 'No group found with that id' });

  return res.status(200).json({ message: 'Group found successfully', group });
};

const allGroup: RequestHandler = async (req, res) => {
  const groups = await getListGroup();

  if (!groups.length)
    return res.status(200).json({ message: 'No group yet', groups });

  return res
    .status(200)
    .json({ message: 'List of group', groupCount: groups.length, groups });
};

const deleteGroup: RequestHandler = async (req, res) => {
  const { group_id } = req.params;

  const group = await getgroupById(group_id);

  if (!group)
    return res.status(200).json({ message: 'No group found with that id' });

  await deleteThisGroup(group_id);
  return res.status(200).json({ message: 'Group delete successfully!' });
};

export { createGroup, groupDetail, allGroup, deleteGroup };

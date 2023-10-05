import { Cycle } from '@prisma/client';
import { RequestHandler } from 'express';
import ErrorAPI from '../utils/error';

import {
  getgroup,
  getgroupById,
  createNewGroup,
  getListGroup,
  deleteThisGroup,
} from '../func/group';
import { Group } from '../interface';

const createGroup: RequestHandler = async (req, res, next) => {
  const input: Group = req.body;
  const { cycle } = input;

  if (!Cycle[cycle])
    return res.status(422).json({ message: 'Wrong cycle value' });

  try {
    const isGroupExist = await getgroup(input.name);
    if (isGroupExist)
      return res.status(409).json({ message: 'Group already exist' });

    await createNewGroup(input);
    return res.status(201).json({ message: 'Group created successfully' });
  } catch (error) {
    const err = new ErrorAPI('Something went wrong while creating the group');
    next(err);
  }
};

const groupDetail: RequestHandler = async (req, res, next) => {
  const { group_id } = req.params;
  try {
    const group = await getgroupById(group_id);
    if (!group)
      return res.status(200).json({ message: 'No group found with that id' });

    return res.status(200).json({ message: 'Group found successfully', group });
  } catch (error) {
    const err = new ErrorAPI( 'Something went wrong while getting the group details');
    next(err);
  }
};

const allGroup: RequestHandler = async (req, res, next) => {
  try {
    const groups = await getListGroup();
  
    if (!groups.length)
      return res.status(200).json({ message: 'No group yet', groups });
  
    return res
      .status(200)
      .json({ message: 'List of group', groupCount: groups.length, groups });
  } catch (error) {
    const err = new ErrorAPI( 'Something went wrong while getting the group list');
    next(err);
  }
};

const deleteGroup: RequestHandler = async (req, res, next) => {
  const { group_id } = req.params;

  try {
    const group = await getgroupById(group_id);
    if (!group)
      return res.status(200).json({ message: 'No group found with that id' });
  
    await deleteThisGroup(group_id);
    return res.status(200).json({ message: 'Group delete successfully!' });
  } catch (error) {
    const err = new ErrorAPI( 'Something went wrong while deleting the group');
    next(err);
  }
};

export { createGroup, groupDetail, allGroup, deleteGroup };

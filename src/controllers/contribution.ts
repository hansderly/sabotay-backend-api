import { RequestHandler } from 'express';
import {
  addContribution,
  getContribution,
  listGroupContribution,
  deleteContribution as removeContribution,
} from '../func/contribution';
import { getgroupById } from '../func/group';
import { getUserById } from '../func/user';

const newContribution: RequestHandler = async (req, res) => {
  const { group_id } = req.params;
  const { user_id } = req.body;
  const group = await getgroupById(group_id);
  if (!group)
    return res.status(401).json({ message: 'This group does not exist' });

  const user = await getUserById(user_id);
  if (!user)
    return res.status(401).json({ message: 'This user does not exist' });

  await addContribution({ user_id, group_id });
  return res.status(201).json({ message: 'Contribution added successfully' });
};

const contributionList: RequestHandler = async (req, res) => {
  const { group_id } = req.params;
  const group = getgroupById(group_id);
  if (!group)
    return res.status(401).json({ message: 'This group does not exist' });

  const contributions = await listGroupContribution(group_id);
  if (!contributions.length)
    return res.status(200).json({ message: 'No contribution yet' });

  return res.status(200).json({ message: 'Contribution list', contributions });
};

const deleteContribution: RequestHandler = async (req, res) => {
  const { group_id, contribution_id } = req.params;
  const group = await getgroupById(group_id);
  if (!group)
    return res.status(401).json({ message: 'This group does not exist' });

  const contribution = await getContribution(contribution_id);
  if (!contribution)
    return res.status(401).json({ message: 'No contribution with that id' });

  await removeContribution(contribution_id, group_id);
  return res.status(200).json({ message: 'Contribution delete successfully' });
};

export { newContribution, contributionList, deleteContribution };

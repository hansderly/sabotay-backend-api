import { RequestHandler } from 'express';
import {
  addContribution,
  getContribution,
  listGroupContribution,
  deleteContribution as removeContribution,
} from '../func/contribution';
import { getUserById } from '../func/user';

const newContribution: RequestHandler = async (req, res, next) => {
  const { group_id } = req.params;
  const { user_id } = req.body;

  try {
    const user = await getUserById(user_id);
    if (!user)
      return res.status(401).json({ message: 'This user does not exist' });

    await addContribution({ user_id, group_id });
    return res.status(201).json({ message: 'Contribution added successfully' });
  } catch (error) {
    const err = new Error('Something went wrong while adding the contribution');
    (err as any).status = 500;
    next(err);
  }
};

const contributionList: RequestHandler = async (req, res, next) => {
  const { group_id } = req.params;

  try {
    const contributions = await listGroupContribution(group_id);
    if (!contributions.length)
      return res.status(200).json({ message: 'No contribution yet' });

    return res
      .status(200)
      .json({ message: 'Contribution list', contributions });
  } catch (error) {
    const err = new Error(
      'Something went wrong while listing the contribution'
    );
    (err as any).status = 500;
    next(err);
  }
};

const deleteContribution: RequestHandler = async (req, res, next) => {
  const { group_id, contribution_id } = req.params;
  try {
    const contribution = await getContribution(contribution_id);
    if (!contribution)
      return res.status(401).json({ message: 'No contribution with that id' });

    await removeContribution(contribution_id, group_id);
    return res
      .status(200)
      .json({ message: 'Contribution delete successfully' });
  } catch (error) {
    const err = new Error(
      'Something went wrong while listing the contribution'
    );
    (err as any).status = 500;
    next(err);
  }
};

export { newContribution, contributionList, deleteContribution };

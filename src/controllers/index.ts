import { register, login } from './auth';
import { createGroup, groupDetail, allGroup, deleteGroup } from './group';
import { addUser, getUserDetail, userList, deleteUser } from './user';
import { addMember, listMember, deleteMemberFromGroup } from './group-member';
import { newContribution, contributionList, deleteContribution } from './contribution';

export {
  // auth
  register,
  login,
  //   group
  createGroup,
  groupDetail,
  allGroup,
  deleteGroup,
  // User
  addUser,
  getUserDetail,
  userList,
  deleteUser,
  // group-member
  addMember,
  listMember,
  deleteMemberFromGroup,
  // contribution
  newContribution,
  contributionList,
  deleteContribution
};

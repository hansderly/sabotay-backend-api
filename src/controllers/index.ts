import { register, login } from './auth.controller';
import { createGroup, groupDetail, allGroup, deleteGroup } from './group.controller';
import { addUser, getUserDetail, userList, deleteUser } from './user.controller';
import { addMember, listMember, deleteMemberFromGroup } from './group-member.controller';
import { newContribution, contributionList, deleteContribution } from './contribution.controller';

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

// import { reducer as formReducer } from "redux-form"; // SAYING use redux form reducer as reducer
import { combineReducers } from 'redux';

import login from './loginReducer';
import auth from './authReducer';
import forgotPassword from './forgotPasswordReducer';
import changePassword from './changePasswordReducer';

import userAdd from './userAddReducer';
import userUpdate from './userUpdateReducers';
import users from './getUsersReducer';
import user from './singleUserReducer';
import deleteUser from './deleteUserReducers';

import categoryAdd from './categoryAddReducer';
import categoryUpdate from './categoryUpdateReducer';
import categories from './getCategoriesReducer';
import category from './singleCategoryReducer';
import deleteCategory from './deleteCategoryReducer';

import advertiseAdd from './advertiseAddReducer';
import advertiseUpdate from './advertiseUpdateReducer';
import advertises from './getAdvertiseReducer';
import advertise from './singleAdvertiseReducer';
import deleteAdvertise from './deleteAdvertiseReducer';

import youtubeAdd from './youtubeAddReducer';
import youtubeUpdate from './youtubeUpdateReducer';
import youtubes from './getYoutubeReducer';
import youtube from './singleYoutubeReducer';
import deleteYoutube from './deleteYoutubeReducer';
import youtubeArchive from "./youtubeArchiveReducer"

import questionAdd from './questionAddReducer';
import questionUpdate from './questionUpdateReducer';
import questions from './getQuestionsReducer';
import question from './singleQuestionReducer';
import deleteQuestion from './deleteQuestionReducer';

import blogAdd from './blogAddReducer';
import blogUpdate from './blogUpdateReducer';
import blogs from './getBlogsReducer';
import blog from './singleBlogReducer';
import imageUpload from './imageUploadReducer';
import deleteBlog from './deleteBlogReducer';

import skillsAdd from './skillAddReducer';
import skillsUpdate from './skillUpdateReducer';
import skills from './getSkillsReducer';
import skill from './singleSkillReducer';
import deleteSkill from './deleteSkillReducer';

import nameAdd from './nameAddReducer';
import nameUpdate from './nameUpdateReducer';
import names from './getNamesReducer';
import name from './singleNameReducer';
import deleteName from './deleteNameReducer';

import typeAdd from './typeAddReducer';
import typeUpdate from './typeUpdateReducer';
import types from './getTypesReducers';
import type from './singleTypeReducer';
import deleteType from './deleteTypeReducer';

import packageAdd from './packageAddReducer';
import packageUpdate from './packageUpdateReducer';
import packages from './getPackagesReducer';
import singlePackage from './singlePackageReducer';
import deletePackage from './deletePackageReducer';

import permissionAdd from './permissionAddReducer';
import permissionUpdate from './permssionUpdateReducer';
import permissions from './getPermissionsReducer';
import permission from './singlePermissionReducer';
import deletePermission from './deletePermissionReducer';

import status from './changeStatusReducer';
import totalCount from './totalCountReducer';
import userCount from './userCountReducer';

import profile from './getProfileReducer';

import catByType from './catByTypeReducer';

import inviteListUser from './usersForSelect';

const rootReducer = combineReducers({
  auth,
  login,
  forgotPassword,
  changePassword,
  userAdd,
  userUpdate,
  users,
  user,
  deleteUser,
  categoryAdd,
  categoryUpdate,
  categories,
  category,
  deleteCategory,
  advertiseAdd,
  advertiseUpdate,
  advertises,
  advertise,
  deleteAdvertise,
  youtubeAdd,
  youtubeUpdate,
  youtubes,
  youtube,
  deleteYoutube,
  youtubeArchive,
  deleteQuestion,
  questionAdd,
  questionUpdate,
  questions,
  question,
  blogAdd,
  blogUpdate,
  imageUpload,
  blogs,
  blog,
  deleteBlog,
  skillsAdd,
  skillsUpdate,
  deleteSkill,
  skills,
  skill,
  name,
  names,
  nameAdd,
  nameUpdate,
  deleteName,
  typeAdd,
  typeUpdate,
  types,
  type,
  deleteType,
  packageAdd,
  packageUpdate,
  deletePackage,
  singlePackage,
  packages,
  permissionAdd,
  permissionUpdate,
  permissions,
  deletePermission,
  permission,
  status,
  totalCount,
  userCount,
  profile,
  catByType,
  inviteListUser,
});

export default rootReducer;

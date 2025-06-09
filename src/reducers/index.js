/*********** Reduceres defined here *********/

import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import encryptor from './encryptor';
import loader from './modules/loader';

// user reducer
import user from './modules/user';
// invitations
import invitations from './modules/invitations';
// Category reducer
import category from './modules/category';
import projects from './modules/projects';
import common from './modules/common';
import jurney from './modules/jurney';
import YoutubePlayer from './modules/YoutubePlayer';

const userPersistConfig = {
  key: 'admin-app',
  storage: storage,
  transforms: [encryptor],
  blacklist: ['router', 'loader'],
};

export default persistCombineReducers(userPersistConfig, {
  loader,
  user,
  invitations,
  category,
  projects,
  YoutubePlayer,
  common,
  jurney,
});

/*
 * @file: index.js
 * @description: It Contain environment variables.
 * @date: 04.07.2018
 * @author: Poonam
 */

const local = {
  // apiUrl: 'http://198.251.65.146:4502',

  //apiUrl: 'http://74.208.206.18:4502',
  apiUrl: 'https://endpoint.crowdsavetheworld.com',
  googleclientId:
    '918949293560-gictkkci73f0un9s963ba9lu2ll1lcm1.apps.googleusercontent.com',

  //apiUrlChat: 'http://74.208.206.18:4503',
  apiUrlChat: 'https://chat.crowdsavetheworld.com',
  // apiUrl: 'http://localhost:1337',
  socketUrl: 'http://localhost:3000',
};
const production = {
  // apiUrl: 'http://198.251.65.146:4502',
  //apiUrl: 'http://74.208.206.18:4502',
  apiUrl: 'https://endpoint.crowdsavetheworld.com',
  // apiUrl: 'http://localhost:1337',
  socketUrl: '',
};

if (process.env.NODE_ENV === 'production') {
  module.exports = production;
} else {
  module.exports = local;
}

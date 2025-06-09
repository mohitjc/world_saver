import { encryptTransform } from 'redux-persist-transform-encrypt';

const encryptor = encryptTransform({
  secretKey: 'my-super-secret-admin-key',
});

export default encryptor;

const Identicon = require('identicon.js');
const crypto = require('crypto');

const _randomBytes = (size) => {
  return new Promise((res, rej) => {
    crypto.randomBytes(size, (err, buf) => {
      if (err) rej(err);
      let hash = buf.toString('hex');
      res(hash);
    });
  });
};

const avatarGenerator = () => {
  return async hook => {

    let hash = await _randomBytes(16);
    // create a base64 encoded PNG
    let image = new Identicon(hash, 50).toString();
    hook.data.avatar = image;
    return hook;
  };
};

module.exports = avatarGenerator;

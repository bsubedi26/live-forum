const Identicon = require('identicon.js')
const crypto = require('crypto')

const _randomBytes = (size) => new Promise((resolve, reject) => {
  crypto.randomBytes(size, (err, buf) => {
    if (err) reject(err)
    const hash = buf.toString('hex')
    resolve(hash)
  })
})

const avatarGenerator = () => {
  return async hook => {
    const hash = await _randomBytes(16)
    // create a base64 encoded PNG
    const image = new Identicon(hash, 50).toString()
    hook.data.avatar = image
    return hook
  }
}

module.exports = avatarGenerator

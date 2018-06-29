const crypto = require('crypto')

exports.handler = async (event) => {
  const key = crypto.pbkdf2Sync(crypto.randomBytes(16), crypto.randomBytes(16), 15000, 32, 'sha512')

  return {
   "isBase64Encoded": false,
   "statusCode": 200,
   "headers": { },
   "body": key.toString('hex')
 }
}

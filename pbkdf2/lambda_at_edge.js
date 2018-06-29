const crypto = require('crypto')

exports.handler = (event, context, callback) => {
  const key = crypto.pbkdf2Sync(crypto.randomBytes(16), crypto.randomBytes(16), 15000, 32, 'sha512')

  const response = {
    status: '200',
    statusDescription: 'OK',
    headers: {
      'cache-control': [{
        key: 'Cache-Control',
        value: 'max-age=0'
      }],
      'content-type': [{
        key: 'Content-Type',
        value: 'text/plain'
      }],
      'content-encoding': [{
        key: 'Content-Encoding',
        value: 'UTF-8'
      }],
    },
    body: key.toString('hex'),
  };
  callback(null, response);
};

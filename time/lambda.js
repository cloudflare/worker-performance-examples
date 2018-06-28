exports.handler = async (event) => {
  return {
    "isBase64Encoded": false,
    "statusCode": 200,
    "headers": { },
    "body": (new Date).toString()
  }
};


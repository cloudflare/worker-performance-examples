var spawn = require('child_process').spawn;
var path = require('path');

exports.handler = function(event, context, callback) {
	let child = spawn(process.env["LAMBDA_TASK_ROOT"] + "/pbkdf2")

  child.stdout.on('data', function(chunk){
    callback(null, {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": { },
      "body": chunk.toString()
    });
  })

  child.stderr.on('data', function(chunk) {
    console.log("ERR OUTPUT " + chunk);
  });
  child.on('error', function(error) {
    console.log("ERR " + error)
  });
}

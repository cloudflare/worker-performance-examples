exports.handler = (event, context, callback) => {
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
        body: (new Date).toString(),
    };
    callback(null, response);
};

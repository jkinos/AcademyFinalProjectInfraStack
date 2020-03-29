'use strict';
var AWS = require('aws-sdk');
const uuid = require('lambda-uuid')

module.exports.requestUploadURL = (event, context, callback) => {
    const s3 = new AWS.S3();
    const params = JSON.parse(event.body);

    const s3Params = {
        Bucket: 'recipe-app-photo-storage',
        Key:  uuid(),
        ContentType: params.fileType,
        ACL: 'public-read',
    };

    const uploadURL = s3.getSignedUrl('putObject', s3Params);

    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ uploadURL: uploadURL }),
    })
}

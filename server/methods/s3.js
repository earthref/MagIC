import os from 'os';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid';
import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
import Archiver from 'archiver';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: Meteor.settings.s3.accessKeyId || "",
  secretAccessKey: Meteor.settings.s3.secretAccessKey || ""
});

export default function () {

  Meteor.methods({

    async s3ListObjects({bucket, prefix, limit}) {
      this.unblock();
      //console.log("s3ListObjects", bucket, prefix, limit);
      return s3ListObjects({bucket, prefix, limit});
    },

    async s3GetObjectBase64({bucket, key}) {
      this.unblock();
      //console.log("s3GetObjectBase64", bucket, key);
      return s3GetObjectBase64({bucket, key});
    },

    s3GetObject({bucket, key, encoding}) {
      this.unblock();
      //console.log("s3GetObject", bucket, key);
      return s3GetObject({bucket, key, encoding});
    },

    s3GetObjectsZip({objects, fileName}) {
      this.unblock();
      //console.log("s3GetObjectsZip", bucket, key);
      return s3GetObjectsZip({objects, fileName});
    }

  });

}

async function s3UploadObject({bucket, key, body}) {
  return await new Promise(resolve => {
    try {
      s3.upload({ Bucket: bucket, Key: key, Body: body }, (error, data) => {
        if (error) {
          console.error("s3UploadObject", `Failed to upload ${bucket}/${key}`, error);
          throw new Meteor.Error("s3UploadObject", `Failed to upload ${bucket}/${key}`);
        }
        else {
          resolve(data);
        }
      });
    } catch (e) { 
      console.error("s3UploadObject", `Failed to upload ${bucket}/${key}`, e);
      throw new Meteor.Error("s3UploadObject", `Failed to upload ${bucket}/${key}`);
    }
  });
}
export { s3UploadObject };

async function s3ListObjects({bucket, prefix, limit}) {
  let nextToken = undefined;
  let isTruncated = true;
  let objects = [];
  while (isTruncated && (!limit || objects.length < limit)) {
    const data = await new Promise(resolve => {
      try {
        s3.listObjectsV2({ Bucket: bucket, Prefix: prefix, ContinuationToken: nextToken }, (error, data) => {
          if (error) {
            console.error("s3ListObjects", `Failed to retrieve S3 objects in ${bucket}/${prefix}`, error);
            throw new Meteor.Error("s3ListObjects", `Failed to retrieve S3 objects in ${bucket}/${prefix}`);
          }
          else {
            resolve(data);
          }
        });
      } catch (e) {
        console.error("s3ListObjects", `Failed to retrieve S3 objects in ${bucket}/${prefix}`, e);
        throw new Meteor.Error("s3ListObjects", `Failed to retrieve S3 objects in ${bucket}/${prefix}`);
      }
    });
    isTruncated = data.IsTruncated;
    nextToken = data.NextContinuationToken;
    objects.push(...data.Contents);
  }
  return (limit && objects.slice(0, limit)) || objects;
}
export { s3ListObjects };

async function s3GetObjectBase64({bucket, key}) {
  return await new Promise(resolve => {
    try {
      s3.getObject({ Bucket: bucket, Key: key }, (error, data) => {
        if (error) {
          console.error("s3GetObjectBase64", `Failed to retrieve S3 object ${bucket}/${key}`, error);
          throw new Meteor.Error("s3GetObjectBase64", `Failed to retrieve S3 object ${bucket}/${key}`);
        }
        else {
          resolve("data:" + data.ContentType + ";base64," + data.Body.toString('base64'));
        }
      });
    } catch (e) {
      console.error("s3GetObjectBase64", `Failed to retrieve S3 object ${bucket}/${key}`, e);
      throw new Meteor.Error("s3GetObjectBase64", `Failed to retrieve S3 object ${bucket}/${key}`);
    }
  });
}
export { s3GetObjectBase64 };

async function s3GetObject({bucket, key, encoding}) {
  const data = await s3.getObject({ Bucket: bucket, Key: key }).promise();
  return encoding ? data.Body.toString(encoding) : data.Body;
}
export { s3GetObject };

async function s3GetObjectsZip({objects, fileName}) {
  return await new Promise((resolve, reject) => {
    try {
      const downloadsPath = path.join(os.tmpdir(), 'downloads');
      if (!fs.existsSync(downloadsPath)) fs.mkdirSync(downloadsPath);
      const zipPath = path.join(downloadsPath, uuid.v4());
      fs.mkdirSync(zipPath);
      const archive = Archiver('zip');
      const output = fs.createWriteStream(`${zipPath}/${fileName}`);
      archive.on('error', error => { throw new Error(`${error.name} ${error.code} ${error.message} ${error.path} ${error.stack}`); });
      archive.pipe(output);
      objects.forEach(object => {
        const stream = s3.getObject({ Bucket: object.bucket, Key: object.key }).createReadStream();
        console.log('zipping', object.key);
        archive.append(stream, { name: object.key });
      })
      archive.finalize();
      output.on('close', () => resolve(fs.readFileSync(`${zipPath}/${fileName}`)));
      archive.on('error', (err) => reject(err));
    } catch (e) {
      console.error("s3GetObjectsZip", `Failed to retrieve and zip S3 objects`, e);
      //throw new Meteor.Error("s3GetObjectsZip", `Failed to retrieve and zip S3 objects`);
    }
  });
}
export { s3GetObjectsZip };

async function s3DeleteKeys({bucket, keys}) {
  return await new Promise(resolve => {
    try {
      s3.deleteObjects({ Bucket: bucket, Delete: { Objects: _.map(keys, k => ({ Key: k })) }}, (error, data) => {
        if (error) {
          console.error("s3DeleteKeys", `Failed to delete S3 keys in ${bucket}`, error);
          throw new Meteor.Error("s3DeleteKeys", `Failed to delete S3 keys in ${bucket}`);
        }
        else {
          resolve(data);
        }
      });
    } catch (e) {
      console.error("s3DeleteKeys", `Failed to delete S3 keys in ${bucket}`, e);
      throw new Meteor.Error("s3DeleteKeys", `Failed to delete S3 keys in ${bucket}`);
    }
  });
}
export { s3DeleteKeys };
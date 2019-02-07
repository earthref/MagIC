import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: Meteor.settings.s3.accessKeyId || "",
  secretAccessKey: Meteor.settings.s3.secretAccessKey || ""
});

export default function () {

  Meteor.methods({

    async s3ListObjects({bucket, prefix}) {
      this.unblock();
      //console.log("s3ListObjects", bucket, prefix);

      let nextToken = undefined;
      let isTruncated = true;
      let objects = [];
      while (isTruncated) {
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
      return objects;
    },

    async s3GetObjectBase64({bucket, key}) {
      this.unblock();
      //console.log("s3GetObjectBase64", bucket, key);

      const data = await new Promise(resolve => {
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
      return data;
    }

  });

}
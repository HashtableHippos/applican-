const s3Router = require('express').Router();
const AWS = require('aws-sdk');
const config = require('../../private/s3');
const savedJobs = require('../db/models/savedJobs');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = config.aws.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = config.aws.AWS_SECRET_ACCESS_KEY;
AWS.config.region = 'us-east-2';

const s3 = new AWS.S3();

s3Router.post('/:jobId', (req, res) => {
  if (!req.files) {
    res.sendStatus(500);
  }
  const { jobId } = req.params;
  const params = {
    Bucket: `hashhippos/resumes/${req.user.id}`,
    Key: jobId,
    ContentType: req.files.file.mimetype,
    Body: req.files.file.data,
  };
  const putObjectPromise = s3.upload(params).promise()
    .then(data => savedJobs.findById(jobId))
    .then((job) => {
      if (job) {
        return job.update({ cover_letter_key: params.Key });
      }
      throw new Error('Job Not Found');
    })
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err));
});

s3Router.get('/:jobId', (req, res) => {
  const { jobId } = req.params;
  const params = {
    Bucket: `hashhippos/resumes/${req.user.id}`,
    Key: jobId,
  };
  s3.getSignedUrl('getObject', params, (err, url) => {
    if (err) {
      console.log(err);
      res.status(500).send('resource retrieval failed');
    }
    res.redirect(url);
  });
});

module.exports = s3Router;

import AWS from 'aws-sdk'
import clean from './clean'

export default async ({ accessKeyId, secretAccessKey, bucket, region }) => {
  AWS.config.update({AccessKeyId: accessKeyId, SecretAccessKey: secretAccessKey})
  const s3 = new AWS.S3()
  await clean({ s3, bucket })
}

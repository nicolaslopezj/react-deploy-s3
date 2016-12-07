#!/usr/bin/env node

import program from 'commander'
import upload from './upload'
import clc from 'cli-color'
import invalidate from './invalidate'

program
.version('0.0.1')
.option('-a, --access-key-id [accessKey]', 'AWS access key')
.option('-s, --secret-access-key [secretKey]', 'AWS secret access key')
.option('-b, --bucket [bucket]', 'Name of the bucket')
.option('-r, --region [region]', 'Region of the bucket [us-east-1]', 'us-east-1')
.option('-r, --distribution-id [distribution-id]', 'Cloudfront distrubution to invalidate index.html')
.parse(process.argv)

if (!program.accessKeyId) {
  throw new Error('access-key-id is required')
}

if (!program.secretAccessKey) {
  throw new Error('secret-access-key is required')
}

if (!program.bucket) {
  throw new Error('bucket is required')
}

const safeDeploy = async () => {
  try {
    console.log('\n' + clc.blue.underline('React deploy S3') + '\n')
    await upload({
      accessKeyId: program.accessKeyId,
      secretAccessKey: program.secretAccessKey,
      bucket: program.bucket,
      region: program.region
    })
    console.log(clc.bold(`App deployed at "${program.bucket}"`))

    if (program.distributionId) {
      await invalidate({
        accessKeyId: program.accessKeyId,
        secretAccessKey: program.secretAccessKey,
        distributionId: program.distributionId
      })
      console.log(clc.bold(`Invalidation created`))
    }
  } catch (error) {
    console.log('Error deploying:', error, error.stack)
    process.exit(1)
  }
}

safeDeploy()

#!/usr/bin/env babel-node --presets=es2015 --plugins=syntax-async-functions,transform-regenerator

import program from 'commander'
import upload from './upload'
import clc from 'cli-color'

program
.version('0.0.1')
.option('-a, --access-key-id [accessKey]', 'AWS access key')
.option('-s, --secret-access-key [secretKey]', 'AWS secret access key')
.option('-b, --bucket [bucket]', 'Name of the bucket')
.option('-r, --region [region]', 'Region of the bucket [us-east-1]', 'us-east-1')
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
      accessKeyId: program.secretAccessKey,
      secretAccessKey: program.secretAccessKey,
      bucket: program.bucket,
      region: program.region
    })
    console.log(clc.bold(`App deployed at "${program.bucket}"`))
  } catch (error) {
    console.log('Error deploying:', error, error.stack)
  }
}

safeDeploy()

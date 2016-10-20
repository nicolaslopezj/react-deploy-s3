#!/usr/bin/env babel-node --presets=es2015 --plugins=syntax-async-functions,transform-regenerator

import program from 'commander'
import {exec} from 'child-process-promise'
import upload from './upload'

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

const deploy = async () => {
  console.log('Builing app...')
  // await exec('npm run build')
  console.log('App built')
  console.log(`Uploading to bucket ${program.bucket}...`)
  await upload({
    accessKeyId: program.secretAccessKey,
    secretAccessKey: program.secretAccessKey,
    bucket: program.bucket,
    region: program.region
  })
  console.log('App uploaded')
}

const safeDeploy = async () => {
  try {
    await deploy()
  } catch (e) {
    console.log('Error deploying:', e)
  }
}

safeDeploy()

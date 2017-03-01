#!/usr/bin/env node

import program from 'commander'
import upload from './upload'
import clc from 'cli-color'
import invalidate from './invalidate'
import setup from './setup'

program
.version('2.0.0')

program
.command('setup')
.description('Setup your AWS S3 and Cloudfront endpoints')
.action(async function (cmd, options) {
  await setup()
})

program
.command('deploy')
.description('Deploy a new build of your app')
.option('-a, --access-key-id [accessKey]', 'AWS access key')
.option('-s, --secret-access-key [secretKey]', 'AWS secret access key')
.option('-b, --bucket [bucket]', 'Name of the bucket')
.option('-r, --region [region]', 'Region of the bucket [us-east-1]', 'us-east-1')
.option('-d, --distribution-id [distribution-id]', 'Cloudfront distrubution to invalidate index.html')
.action(async function (cmd, options) {
  if (!cmd.accessKeyId) {
    throw new Error('access-key-id is required')
  }

  if (!cmd.secretAccessKey) {
    throw new Error('secret-access-key is required')
  }

  if (!cmd.bucket) {
    throw new Error('bucket is required')
  }

  try {
    console.log('\n' + clc.blue.underline('React deploy S3') + '\n')
    await upload({
      accessKeyId: cmd.accessKeyId,
      secretAccessKey: cmd.secretAccessKey,
      bucket: cmd.bucket,
      region: cmd.region
    })
    console.log(clc.bold(`App deployed at "${cmd.bucket}"`))

    if (cmd.distributionId) {
      await invalidate({
        accessKeyId: cmd.accessKeyId,
        secretAccessKey: cmd.secretAccessKey,
        distributionId: cmd.distributionId
      })
      console.log(clc.bold(`Invalidation created`))
    }
  } catch (error) {
    console.log('\n' + clc.bold.red(error.message) + '\n')
    console.log(error)
    process.exit(1)
  }
})

program.parse(process.argv)

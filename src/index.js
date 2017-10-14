#!/usr/bin/env node

import program from 'commander'
import clc from 'cli-color'
import setup from './setup'
import deploy from './deploy'

program.version('2.0.0')

program
  .command('setup')
  .description('Setup your AWS S3 and Cloudfront endpoints')
  .action(async function(cmd, options) {
    await setup()
  })

program
  .command('deploy')
  .description('Deploy a new build of your app')
  .option('-a, --access-key-id [accessKey]', 'AWS access key')
  .option('-s, --secret-access-key [secretKey]', 'AWS secret access key')
  .option('-b, --bucket [bucket]', 'Name of the bucket')
  .option('-r, --region [region]', 'Region of the bucket [us-east-1]', 'us-east-1')
  .option('-c, --rebuild-app [yes/no]', 'Compile the app [yes]')
  .option(
    '-d, --distribution-id [distribution-id]',
    'Cloudfront distrubution to invalidate index.html'
  )
  .action(async function(cmd, options) {
    try {
      if (!cmd.accessKeyId) {
        throw new Error('access-key-id is required')
      }

      if (!cmd.secretAccessKey) {
        throw new Error('secret-access-key is required')
      }

      if (!cmd.bucket) {
        throw new Error('bucket is required')
      }
      await deploy(cmd)
    } catch (error) {
      console.log('\n' + clc.bold.red(error.message) + '\n')
      console.log(error)
      process.exit(1)
    }
  })

program.parse(process.argv)

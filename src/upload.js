import AWS from 'aws-sdk'
import clean from './clean'
import mime from 'mime'
import fs from 'fs'
import getFiles from './getFiles'
import filesize from 'filesize'
import {Spinner} from 'cli-spinner'
import build from './build'

export default async ({ accessKeyId, secretAccessKey, bucket, region }) => {
  await build()
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
  })

  const s3 = new AWS.S3()
  await clean({ s3, bucket })

  const files = getFiles()
  let spinner = new Spinner('%s')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  for (var i = 0; i < files.length; i++) {
    const file = files[i]
    const stream = fs.createReadStream(file)
    const stats = fs.statSync(file)
    const contentType = mime.lookup(file)
    const fileName = file.replace(/^build\//, '')
    const size = filesize(stats.size)
    spinner.setSpinnerTitle(`%s   Uploading ${fileName} (${size})...`)

    await s3.upload(s3, {
      Bucket: bucket,
      Key: fileName,
      Body: stream,
      ACL: 'public-read',
      ContentType: contentType
    }).promise()
  }
  spinner.stop(true)
}

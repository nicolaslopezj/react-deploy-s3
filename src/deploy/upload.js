import AWS from 'aws-sdk'
import clean from './clean'
import getFiles from './getFiles'
import {Spinner} from 'cli-spinner'
import build from './build'
import uploadFile from './uploadFile'

export default async ({accessKeyId, secretAccessKey, bucket, region, shouldBuild}) => {
  if (shouldBuild) {
    await build()
  }

  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
  })

  const s3 = new AWS.S3()
  await clean({s3, bucket})

  const files = getFiles()

  let spinner = new Spinner('%s')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()
  spinner.setSpinnerTitle(`%s   Uploading files...`)

  const uploads = files.map(file => uploadFile({bucket, file, spinner}))

  await Promise.all(uploads)

  spinner.stop(true)
}

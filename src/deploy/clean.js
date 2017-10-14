import {Spinner} from 'cli-spinner'
import clc from 'cli-color'

export default async ({s3, bucket}) => {
  let spinner = new Spinner('%s Removing old files...')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  const listResult = await s3.listObjects({Bucket: bucket}).promise()
  if (listResult.Contents.length === 0) {
    spinner.stop(true)
    return console.log('No files to delete')
  }
  await s3
    .deleteObjects({
      Bucket: bucket,
      Delete: {
        Objects: listResult.Contents.map(file => {
          return {Key: file.Key}
        })
      }
    })
    .promise()

  spinner.stop(true)

  console.log(clc.bold('Old files deleted'))
}

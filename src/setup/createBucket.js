import {Spinner} from 'cli-spinner'

export default async function (s3, bucketName) {
  let spinner = new Spinner('%s Creating bucket...')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  await s3.createBucket({
    Bucket: bucketName
  }).promise()

  spinner.stop(true)

  console.log('Bucket created correctly')
}

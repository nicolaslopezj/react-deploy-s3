import {Spinner} from 'cli-spinner'

export default async function (s3, bucketName) {
  let spinner = new Spinner('%s Configuring bucket...')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  await s3.putBucketWebsite({
    Bucket: bucketName,
    WebsiteConfiguration: {
      ErrorDocument: {Key: 'index.html'},
      IndexDocument: {Suffix: 'index.html'}
    }
  }).promise()

  spinner.stop(true)
  console.log('Bucket is configured')
}

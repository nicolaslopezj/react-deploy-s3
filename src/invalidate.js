import AWS from 'aws-sdk'
import {Spinner} from 'cli-spinner'

export default async function ({ accessKeyId, secretAccessKey, distributionId }) {
  AWS.config.update({ accessKeyId, secretAccessKey })
  const cloudfront = new AWS.CloudFront()

  let spinner = new Spinner('%s Creating invalidation')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const params = {
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: 'react-deploy-s3-' + timestamp,
      Paths: {
        Quantity: 1,
        Items: [
          '/index.html'
        ]
      }
    }
  }

  await cloudfront.createInvalidation(params).promise()

  spinner.stop(true)
}

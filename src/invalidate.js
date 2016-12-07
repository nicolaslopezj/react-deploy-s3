import AWS from 'aws-sdk'
import {Spinner} from 'cli-spinner'

const invalidate = function (cloudfront, distributionId, file) {
  return new Promise(function (resolve, reject) {
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
    cloudfront.createInvalidation(params, function (error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

export default async function ({ accessKeyId, secretAccessKey, distributionId }) {
  AWS.config.update({ accessKeyId, secretAccessKey })
  const cloudfront = new AWS.CloudFront()

  let spinner = new Spinner('%s Creating invalidation')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  await invalidate(cloudfront, distributionId, 'index.html')

  spinner.stop(true)
}

import mime from 'mime'
import fs from 'fs'
import AWS from 'aws-sdk'
import filesize from 'filesize'

export default async function({bucket, file, spinner}) {
  const s3 = new AWS.S3()
  const stream = fs.createReadStream(file)
  const stats = fs.statSync(file)
  const contentType = mime.lookup(file)
  const fileName = file.replace(/^build\//, '')
  const size = filesize(stats.size)
  return new Promise(function(resolve, reject) {
    s3.upload(
      {
        Bucket: bucket,
        Key: fileName,
        Body: stream,
        ACL: 'public-read',
        ContentType: contentType
      },
      function(error, data) {
        if (error) {
          reject(error)
        } else {
          spinner.setSpinnerTitle(`%s   Uploaded ${fileName} ${size}...`)
          resolve(data)
        }
      }
    )
  })
}

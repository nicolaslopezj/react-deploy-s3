
export default async ({ s3, bucket }) => {
  console.log('Removing old files')
  const listResult = await s3.listObjects({Bucket: bucket}).promise()
  if (listResult.Contents.length === 0) {
    return console.log('No files to delete')
  }
  return await s3.deleteObjects({
    Bucket: bucket,
    Delete: {
      Objects: listResult.Contents.map(file => {
        return {Key: file.Key}
      })
    }
  }).promise()
}

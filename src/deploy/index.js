import upload from './upload'
import invalidate from './invalidate'
import clc from 'cli-color'

export default async function({
  accessKeyId,
  secretAccessKey,
  bucket,
  region,
  distributionId,
  rebuildApp
}) {
  console.log('\n' + clc.blue.underline('React deploy S3') + '\n')
  await upload({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    bucket: bucket,
    region: region,
    shouldBuild: rebuildApp !== 'no'
  })
  console.log(clc.bold(`App deployed at "${bucket}"`))

  if (distributionId) {
    await invalidate({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      distributionId: distributionId
    })
    console.log(clc.bold(`Invalidation created`))
  }
}

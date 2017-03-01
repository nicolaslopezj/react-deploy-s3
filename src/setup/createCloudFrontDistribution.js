import inquirer from 'inquirer'
import requestSSL from './requestSSL'
import {Spinner} from 'cli-spinner'

export default async function (cloudfront, bucketName) {
  const {aliases} = await inquirer.prompt([
    {type: 'input', name: 'aliases', message: 'Aliases (CNAME). Separate with comma'}
  ])

  const domains = aliases.split(',').map(alias => alias.trim())
  let sslACM = null
  if (domains && domains.length) {
    const {addSSL} = await inquirer.prompt([
      {type: 'confirm', name: 'addSSL', message: 'Request a AWS managed SSL for the domains'}
    ])
    if (addSSL) {
      console.log('')
      sslACM = await requestSSL(domains)
    }
  }

  const params = {
    DistributionConfig: {
      Enabled: true,
      CallerReference: String(Number(new Date())),
      Comment: `Distribution for ${bucketName}`,
      Aliases: {
        Quantity: domains.length,
        Items: domains
      },
      Origins: {
        Quantity: 1,
        Items: [
          {
            DomainName: `${bucketName}.s3.amazonaws.com`,
            Id: `S3-${bucketName}`,
            S3OriginConfig: {
              OriginAccessIdentity: ''
            }
          }
        ]
      },
      DefaultCacheBehavior: {
        ForwardedValues: {
          Cookies: {
            Forward: 'none'
          },
          QueryString: false
        },
        MinTTL: 0,
        TargetOriginId: `S3-${bucketName}`,
        TrustedSigners: {
          Enabled: false,
          Quantity: 0
        },
        ViewerProtocolPolicy: 'allow-all'
      },
      CustomErrorResponses: {
        Quantity: 3,
        Items: [
          {
            ErrorCode: 400,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          },
          {
            ErrorCode: 403,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          },
          {
            ErrorCode: 404,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          }
        ]
      },
      DefaultRootObject: '/index.html',
      PriceClass: 'PriceClass_All',
      ViewerCertificate: sslACM ? {
        ACMCertificateArn: sslACM,
        Certificate: 'allow-all',
        CertificateSource: 'acm',
        CloudFrontDefaultCertificate: false,
        MinimumProtocolVersion: 'TLSv1',
        SSLSupportMethod: 'sni-only'
      } : undefined
    }
  }

  console.log('')

  let spinner = new Spinner('%s Creating CloudFront distribution...')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  const {Distribution: {Id}} = await cloudfront.createDistribution(params).promise()

  spinner.stop(true)

  console.log(`CloudFront ready. Save the distribution id ${Id}`)
  return Id
}

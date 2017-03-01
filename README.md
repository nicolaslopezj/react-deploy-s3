# React Deploy S3

Deploy create react app's in AWS S3

![Demo](https://raw.githubusercontent.com/orionsoft/react-deploy-s3/master/demo.gif)

## Instructions

### Install the tool

```sh
yarn global add react-deploy-s3
```

### Attach policy to user in AWS

IAM Management Console **>** Users **>** [The user you will use] **>** Inline Policies **>** Create User Policy **>** Custom Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "s3:*",
                "acm:describeCertificate",
                "acm:requestCertificate",
                "acm:addTagsToCertificate",
                "cloudfront:createDistribution",
                "cloudfront:createInvalidation"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

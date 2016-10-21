# React Deploy S3

Deploy create react app's in AWS S3

## Instructions

### Install the tool

```sh
yarn add --dev react-deploy-s3
```

or

```sh
npm install --save-dev react-deploy-s3
```

### Attach policy to user in AWS

IAM Management Console **>** Users **>** [The user you will use] **>** Inline Policies **>** Create User Policy **>** Custom Policy 

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1442501159000",
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": [
                "arn:aws:s3:::[bucket-name]/*",
                "arn:aws:s3:::[bucket-name]"
            ]
        }
    ]
}
```

### Deploy your app

Usage: ```react-deploy-s3 [options]```

**Options:**

- ```--help``` output usage information
- ```--version``` output the version number
- ```--access-key-id [accessKey]``` AWS access key
- ```--secret-access-key [secretKey]``` AWS secret access key
- ```--bucket [bucket]``` Name of the bucket
- ```--region [region]``` Region of the bucket [us-east-1]

### Prepare your S3 bucket

![setup-s3](http://i.imgur.com/0PSxUvs.png)

### SEO

You can add seo to this app by using [s3-static-proxy](https://github.com/nicolaslopezj/s3-static-proxy).

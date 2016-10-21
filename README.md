# React Deploy S3

Deploy create react app's in AWS S3

## Instructions

### Install the tool

```sh
npm install -g react-deploy-s3
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

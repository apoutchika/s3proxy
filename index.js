'use strict'

const app = require('express')()
const aws = require('aws-sdk')

const PORT = process.env.PORT || 80

const Bucket = process.env.BUCKET

const s3 = new aws.S3({
  endpoint: process.env.ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACESS_KEY,
  s3ForcePathStyle: Boolean(process.env.S3_FORCE_PATH_STYLE)
})

app.get('/:path(*)', (req, res, next) => {
  s3.getObject({ Bucket, Key: req.params.path }, (err, data) => {
    if (err) {
      console.error(err)
      return res.status(404).send('Not found')
    }

    res.send(data.Body)
  })
})

app.listen(PORT, () => {
  console.log('server started on port ' + PORT)
})

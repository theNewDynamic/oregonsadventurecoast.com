const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY, //ID,
  secretAccessKey: process.env.AWS_SECRET
});

const saveFile = async (name, content) => {
  const fileContent = content;

  // Setting up S3 upload parameters
  const params = {
      Bucket: "oregonsadventurecoast-tnd", //BUCKET_NAME,
      Key: `public/${name}`, // File name you want to save as in S3
      Body: fileContent,
      ContentType: "application/json"
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          console.log(err)
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
      }
  });
}

module.exports = saveFile;
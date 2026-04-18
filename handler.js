const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { DynamoDBClient, PutItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");

const s3 = new S3Client({ region: "ap-south-1" });
const db = new DynamoDBClient({ region: "ap-south-1" });

// ✅ Upload URL generator + save metadata
module.exports.getUploadUrl = async (event) => {
  try {
    const fileName = event.queryStringParameters?.name || "file.txt";
    const uniqueKey = `uploads/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: "file-sharing-bucket-demo-123",
      Key: uniqueKey,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    // ✅ Save metadata to DynamoDB
    await db.send(
      new PutItemCommand({
        TableName: "files-table",
        Item: {
          id: { S: Date.now().toString() },
          fileName: { S: fileName },
          fileKey: { S: uniqueKey },
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url,
      }),
    };

  } catch (error) {
    console.error("ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error generating upload URL",
        error: error.message,
      }),
    };
  }
};

// ✅ NEW: Get all files
module.exports.getFiles = async () => {
  try {
    const data = await db.send(
      new ScanCommand({
        TableName: "files-table",
      })
    );

    const bucketName = "file-sharing-bucket-demo-123";

    const files = data.Items.map((item) => {
      const fileKey = item.fileKey.S;

      return {
        id: item.id.S,
        fileName: item.fileName.S,
        fileUrl: `https://${bucketName}.s3.ap-south-1.amazonaws.com/${fileKey}`,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(files),
    };

  } catch (error) {
    console.error("ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error fetching files",
        error: error.message,
      }),
    };
  }
};
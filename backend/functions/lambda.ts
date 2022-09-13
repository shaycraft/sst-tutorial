import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function counterHandler(event: any): Promise<any> {
  const tableName = await new DynamoDB()
    .describeTable({ TableName: 'Ticker' })
    .promise();

  const putParams = {
    TableName: process.env.tableName || 'default',
    Key: {
      ticker: 'hits',
    },
    // Update the "tally" column
    UpdateExpression: 'SET tally = :count',
    ExpressionAttributeValues: {
      // Increase the count
      ':count': 42,
    },
  };

  await dynamoDb.update(putParams).promise();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Counter set to 42`,
  };
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Hello, World! Your request was received at ${event.requestContext.time}.  However, you suck.  I like turtles.`,
  };
};

export const postHandler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plan' },
      body: 'Empty body',
    };
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: `{ "message": "You sux, ${event.body}" }`,
  };
};

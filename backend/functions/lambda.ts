import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Hello, World! Your request was received at ${event.requestContext.time}.  However, you suck.  I like turtles.`,
  };
};

export const postHandler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 500,
    headers: { 'Content-Type': 'application/json' },
    body: `{ "errorMessage": "You sux" }`,
  };
};

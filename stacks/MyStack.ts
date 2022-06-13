// SST
import { StackContext, Api, Table } from '@serverless-stack/resources';

export function MyStack({ stack }: StackContext) {
  const table = new Table(stack, 'Ticker', {
    fields: {
      ticker: 'string',
    },
    primaryIndex: { partitionKey: 'ticker' },
  });

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        // Allow the API to access the table
        permissions: [table],
        // Pass in the table name to our API
        environment: {
          tableName: table.tableName,
        },
      },
    },
    routes: {
      'GET /': 'functions/lambda.handler',
      'GET /counter': 'functions/lambda.counterHandler',
      'POST /': 'functions/lambda.postHandler',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}

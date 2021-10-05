import * as functions from 'firebase-functions';
import * as https from 'https';

const API_KEY = functions.config().trafikverket.key;
const AGENT = new https.Agent({ keepAlive: true });
const QUERY_OPTIONS = {
  host: 'api.trafikinfo.trafikverket.se',
  path: '/v2/data.json',
  method: 'POST',
  headers: {
    'Content-Type': 'text/xml',
  },
  agent: AGENT,
};

export const trafikverket = functions
  .runWith({
    maxInstances: 1,
  })
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    try {
      const query = createRequest(request.body);
      const json = await get(query);

      response.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers':
          'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin',
      });
      response.json(json);
    } catch {
      response.sendStatus(500);
    }
  });

const get = (query: string): Promise<JSON> => {
  return new Promise((resolve, reject) => {
    const request = https.request(QUERY_OPTIONS, (response) => {
      response.setEncoding('utf8');
      let responseBody = '';
      response.on('data', (chunk) => {
        responseBody += chunk;
      });
      response.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    request.on('error', (error) => reject(error));
    request.write(query);
    request.end();
  });
};

const createRequest = (query: string): string => {
  return `
        <REQUEST>
            <LOGIN authenticationkey="${API_KEY}" />
            ${query}
        </REQUEST>
        `;
};

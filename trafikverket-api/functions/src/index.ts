import * as functions from 'firebase-functions';
import * as https from 'https';

const API_KEY = functions.config().trafikverket.key;
const QUERY_OPTIONS = {
  host: 'api.trafikinfo.trafikverket.se',
  path: '/v2/data.json',
  method: 'POST',
  headers: {
    'Content-Type': 'text/xml',
  },
  agent: new https.Agent({ keepAlive: true }),
};

export const trafikverket = functions
  .runWith({
    maxInstances: 1,
  })
  .region('europe-west1')
  .https.onCall(async (data) => {
    try {
      const query = createRequest(data);
      return await get(query);
    } catch (error) {
      throw new functions.https.HttpsError('unknown', 'Unexpected error');
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

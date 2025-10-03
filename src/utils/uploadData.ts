import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { tryIncreaseRequestsCounter, decreaseRequestsCounter } from './redis';
import { bulkInsert } from './elasticsearch/elasticsearch-utils';

async function uploadData(inputFileLocation: string) {

  const isRequestWithinLimit = await tryIncreaseRequestsCounter();
  console.log('Current concurrent requests:', isRequestWithinLimit ? 'Within limit' : 'Exceeded limit');
  if (!isRequestWithinLimit) {
    throw new Error(`Too many requests`);
  }

  const inputStream = createReadStream(inputFileLocation);
  const rl = createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  let batch = [];

  for await (const line of rl) {
    if (line.trim()) {
      batch.push(JSON.parse(line.trim()) as Document);
    }

    if (batch.length === 100) {
      await bulkInsert(batch);
      batch = [];
    }
  }

  if (batch.length > 0) {
    await bulkInsert(batch);
  }

  await decreaseRequestsCounter();
}

export { uploadData };

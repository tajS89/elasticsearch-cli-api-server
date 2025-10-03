import client from "./client"
import { MAX_CONCURRENT_UPLOAD_REQUESTS } from "../../config";
const CONCURRENT_KEY = 'current_requests';

const getCurrentRequests = async () => {
  const current = (await client.get(CONCURRENT_KEY) || 0).toString();
  return parseInt(current);
}


const tryIncreaseRequestsCounter = async () => {
  const current = await getCurrentRequests();

  if (current >= MAX_CONCURRENT_UPLOAD_REQUESTS) {
    return false;
  }

  await client.incr(CONCURRENT_KEY);
  return true;
}

const decreaseRequestsCounter = async () => {
  const current = await getCurrentRequests();
  if (current > 0) {
    await client.decr(CONCURRENT_KEY);
  }
}

export {
  tryIncreaseRequestsCounter,
  decreaseRequestsCounter
}
import { Client } from '@elastic/elasticsearch';
import { ELASTICSEARCH_HOST, ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD } from '../../config';

const client = new Client({
    node: ELASTICSEARCH_HOST,
    auth: ELASTICSEARCH_USERNAME && ELASTICSEARCH_PASSWORD
        ? {
            username: ELASTICSEARCH_USERNAME,
            password: ELASTICSEARCH_PASSWORD,
        }
        : undefined,
});

export default client;
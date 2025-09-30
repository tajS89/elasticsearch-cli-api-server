import dotenv from 'dotenv';
dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || '3000';
export const ELASTICSEARCH_HOST = process.env.ELASTICSEARCH_HOST || 'http://localhost:9200';
export const ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME;
export const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD;
export const ELASTICSEARCH_INDEX_NAME = process.env.ELASTICSEARCH_INDEX_NAME || 'documents';
export const REDIS_URL = process.env.REDIS_URL;
export const MAX_CONCURRENT_UPLOAD_REQUESTS = parseInt(process.env.MAX_CONCURRENT_UPLOAD_REQUESTS || '3', 10);
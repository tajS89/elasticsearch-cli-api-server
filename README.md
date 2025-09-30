# Elasticsearch CLI & API 

## Overview

This project provides a streamlined **CLI tool** and **REST API** for interacting with Elasticsearch.

- The **CLI** enables bulk data insertion from files into an Elasticsearch cluster
- The **API** allows you to search indexed data using search terms

Data is stored in `mock-data.ndjson`, with mapping configuration in `mapping.json`.

This tool is ideal for developers who need a lightweight interface for inserting and querying Elasticsearch data.

---

## Features

### CLI
- Bulk insert data into a default Elasticsearch index
- Support for both interactive and stateless usage
- Graceful handling of Elasticsearch connections
- Rate limiting for bulk insert operations using Redis (default: 5 concurrent requests)

### API
- Search indexed documents by search term
- Returns results in JSON format
- Built with Node.js for easy extension

---

## Requirements

- Node.js >= 16
- Yarn
- Docker & Docker Compose
- Elasticsearch >= 7.x

---

## Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:tajS89/elasticsearch-cli-api-server.git
   cd elasticsearch-cli-api-server
   ```

2. **Install dependencies**
   ```bash
   yarn
   ```

3. **Configure environment variables**
   
   Create a `.env` file with the following configuration:
   ```bash
   SERVER_PORT=3000
   ELASTICSEARCH_HOST=http://localhost:9200
   ELASTICSEARCH_USERNAME=
   ELASTICSEARCH_PASSWORD=
   ELASTICSEARCH_INDEX_NAME=documents
   REDIS_URL=redis://localhost:6379
   MAX_CONCURRENT_UPLOAD_REQUESTS=5
   NODE_ENV=development
   ```

4. **Start services using Docker Compose**
   ```bash
   docker-compose up -d
   ```

---

## Usage

### CLI

**Insert data**

```bash
esh upload -l mock-data.ndjson
```
The upload command automatically creates an index with proper mapping if it doesn't exist. The index name is taken from your environment variables, and the mapping includes tokenization and analyzers optimized for searchable data.
### API

**Start the server**

```bash
npm start server
```

The server will run on the configured port (default: `3000`).

**Search documents**

- **Endpoint:** `/search`
- **Method:** `GET`
- **Query Parameter:** `term` — The search term to query indexed documents

**Example request:**

```http
GET http://localhost:3000/search?term=coffee
```

**Example response:**

```json
[
  {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "title": "My document",
    "abstract": "This is a test abstract",
    "score": 1.23
  },
  {
    "uuid": "223e4567-e89b-12d3-a456-426614174001",
    "title": "Another document",
    "abstract": "Another test abstract",
    "score": 0
  }
]
```

**Notes:**
- The `score` field is normalized to `0` if Elasticsearch returns `0.001`
- Response includes `uuid`, `title`, and `abstract` fields from indexed documents

---

import type { Document, SearchApiResponse } from "src/utils/elasticsearch/elasticsearch-utils";
export const documents: Document[] = [
  {
    uuid: 'uuid-1',
    title: 'title-1',
    abstract: 'abstract-1',
    tags: {
      main: 'main tag 1',
      keyword: 'keyword tag 1',
    },
    relationships: [{
      cause_concept_name: 'cause concept name 1',
      effect_concept_name: 'effect concept name 1',
    }, {
      cause_concept_name: 'cause concept name 2',
      effect_concept_name: 'effect concept name 2',
    }]
  }, {
    uuid: 'uuid-2',
    title: 'title-2',
    abstract: 'abstract-2',
    tags: {
      main: 'main tag 2',
      keyword: 'keyword tag 2',
    },
    relationships: [{
      cause_concept_name: 'cause concept name 3',
      effect_concept_name: 'effect concept name 3',
    }, {
      cause_concept_name: 'cause concept name 4',
      effect_concept_name: 'effect concept name 4',
    }]
  }
]

export const bulkInsertPayload = {
  "body":
    [{
      "index":
      {
        "_id": "uuid-1",
        "_index": "documents"
      }
    }, {
      "abstract": "abstract-1",
      "relationships": [{
        "cause_concept_name": "cause concept name 1",
        "effect_concept_name": "effect concept name 1"
      },
      {
        "cause_concept_name": "cause concept name 2",
        "effect_concept_name": "effect concept name 2"
      }], "tags":
      {
        "keyword": "keyword tag 1",
        "main": "main tag 1"
      },
      "title": "title-1",
      "uuid": "uuid-1"
    },
    {
      "index":
      {
        "_id": "uuid-2",
        "_index": "documents"
      }
    },
    {
      "abstract": "abstract-2",
      "relationships": [{
        "cause_concept_name": "cause concept name 3",
        "effect_concept_name": "effect concept name 3"
      },
      {
        "cause_concept_name": "cause concept name 4",
        "effect_concept_name": "effect concept name 4"
      }],
      "tags": {
        "keyword": "keyword tag 2",
        "main": "main tag 2"
      },
      "title": "title-2",
      "uuid": "uuid-2"
    }],
  "refresh": true
}

export const searchApiResponse: SearchApiResponse[] = [
  {
    uuid: 'uuid-1',
    title: 'title-1',
    abstract: 'abstract-1',
    score: 1.5
  },
  {
    uuid: 'uuid-2',
    title: 'title-2',
    abstract: 'abstract-2',
    score: 1
  }
]
import client from './client';
import { ELASTICSEARCH_INDEX_NAME } from '../../config';
import mapping from './mapping.json';

type Relationship = {
  cause_concept_name: string;
  effect_concept_name: string;
};

export type Document = {
  uuid: string;
  title: string;
  abstract: string;
  tags: {
    main: string;
    keyword: string;
  };
  relationships: Relationship[];
};

interface ElasticSearchResponse {
  hits: {
    hits: Array<{
      _source: Document;
      _score: number;
    }>;
  };
}

interface SearchApiResponse {
  uuid: string;
  title: string;
  abstract: string;
  score: number;
}

const createIndexWithMappingIfNotExists = async () => {
  const { body: exists } = await client.indices.exists({ index: ELASTICSEARCH_INDEX_NAME });
  console.log('Index exists:', exists);
  if (!exists) {
    await client.indices.create({ index: ELASTICSEARCH_INDEX_NAME, body: mapping });
    console.log('Index Created for the first time');
  }
};

const bulkInsert = async (documents: Document[]) => {
  try {
    await createIndexWithMappingIfNotExists();
    const body = documents.flatMap((doc) => [{ index: { _index: ELASTICSEARCH_INDEX_NAME, _id: doc.uuid } }, doc]);
    const resp = await client.bulk({ refresh: true, body })
    if (resp.body.errors) {
      for (const item of resp.body.items) {
        const action = Object.keys(item)[0]
        const result = item[action]
        if (result.error) {
          console.error(`Failed [${action}] on _id=${result._id}`)
        }
      }
    } else {
      console.info('All documents indexed successfully')
    }
  } catch (error) {
    console.error('Bulk insert error:', error);
  }
}

const search = async (searchTerm: string) => {
  const response = await client.search<ElasticSearchResponse>({
    index: ELASTICSEARCH_INDEX_NAME,
    body: {
      query: {
        function_score: {
          query: {
            nested: {
              path: "relationships",
              query: {
                term: {
                  "relationships.cause_concept_name": searchTerm,
                },
              },
            },
          },
          functions: [
            {
              filter: { term: { title: searchTerm } },
              weight: 1,
            },
            {
              filter: { term: { tags: searchTerm } },
              weight: 0.51,
            },
            {
              filter: { term: { abstract: searchTerm } },
              weight: 0.1,
            },
            {
              filter: {
                bool: {
                  must_not: [
                    { term: { title: searchTerm } },
                    { term: { tags: searchTerm } },
                    { term: { abstract: searchTerm } },
                  ],
                },
              },
              weight: 0.001,
            },
          ],
          score_mode: "sum",
          boost_mode: "replace",
        },
      },
      sort: [
        { _score: { order: "desc" } },
      ],
    },
  });
  return response.body.hits.hits.map((item) => {
    const data = item._source;
    return {
      uuid: data.uuid,
      title: data.title,
      abstract: data.abstract,
      score: item._score === 0.001 ? 0 : item._score,
    } as SearchApiResponse;
  });
};

export {
  bulkInsert,
  search,
};

import type { ElasticSearchResponse } from "src/utils/elasticsearch/elasticsearch-utils";

const esClientMockWithoutIndex = {
  indices: {
    exists: jest.fn().mockResolvedValue({ body: false }),
    create: jest.fn().mockResolvedValue({ body: {} }),
  },
  bulk: jest.fn().mockResolvedValue({ body: { errors: false, items: [] } }),
};

const esClientMockWithIndex = {
  indices: {
    exists: jest.fn().mockResolvedValue({ body: true }),
    create: jest.fn().mockResolvedValue({ body: {} }),
  },
  bulk: jest.fn().mockResolvedValue({ body: { errors: false, items: [] } }),
};

const esClientMockWithErrors = {
  indices: {
    exists: jest.fn().mockResolvedValue({ body: true }),
    create: jest.fn().mockResolvedValue({ body: {} }),
  },
  bulk: jest.fn().mockResolvedValue({
    body: {
      errors: true,
      items: [
        { index: { _id: '1', error: { type: 'mapper_parsing_exception', reason: 'failed to parse' } } },
      ]
    }
  }),
};



const esClientMockWithException = {
  indices: {
    exists: jest.fn().mockResolvedValue({ body: true }),
    create: jest.fn().mockResolvedValue({ body: {} }),
  },
  bulk: jest.fn().mockRejectedValue(new Error('Bulk insert failed')),
};

const esClientMockSearch = {
  search: jest.fn().mockResolvedValue({
    body: {
      hits: {
        hits: [
          {
            _source: {
              uuid: 'uuid-1',
              title: 'title-1',
              abstract: 'abstract-1',
              tags: {
                main: 'main tag 1',
                keyword: 'keyword tag 1'
              },
              relationships: [
                { cause_concept_name: 'cause concept name 1', effect_concept_name: 'effect concept name 1' },
                { cause_concept_name: 'cause concept name 2', effect_concept_name: 'effect concept name 2' }
              ]
            },
            _score: 1.5
          },
          {
            _source: {
              uuid: 'uuid-2',
              title: 'title-2',
              abstract: 'abstract-2',
              tags: {
                main: 'main tag 2',
                keyword: 'keyword tag 2'
              },
              relationships: [
                { cause_concept_name: 'cause concept name 3', effect_concept_name: 'effect concept name 3' },
                { cause_concept_name: 'cause concept name 4', effect_concept_name: 'effect concept name 4' }
              ]
            },
            _score: 1.0
          }

        ]
      }
    }
  } as unknown as ElasticSearchResponse),
};

export {
  esClientMockWithoutIndex,
  esClientMockWithIndex,
  esClientMockWithErrors,
  esClientMockWithException,
  esClientMockSearch
};

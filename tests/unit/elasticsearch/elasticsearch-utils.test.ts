import { bulkInsert } from "src/utils/elasticsearch/elasticsearch-utils";

jest.mock("src/utils/elasticsearch/client", () => {
  return {
    indices: {
      exists:
        jest.fn().mockResolvedValue({ body: false }),
      create: jest.fn().mockResolvedValue({ body: {} }),
    },
    bulk: jest.fn().mockResolvedValue({ body: { errors: false, items: [] } }),
    search: jest.fn().mockResolvedValue({ body: { hits: { hits: [] } } }),
  };
});



describe("Elasticsearch Utilities", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test("initializes cli and adds commands", () => {
    console.log(bulkInsert([]));
  });
});
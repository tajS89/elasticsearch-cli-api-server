import { esClientMock } from "../../mocks/elasticsearch/elasticsearch-utils.mock";
import { bulkInsert } from "src/utils/elasticsearch/elasticsearch-utils";

jest.mock("src/utils/elasticsearch/client", () => {
  return esClientMock
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
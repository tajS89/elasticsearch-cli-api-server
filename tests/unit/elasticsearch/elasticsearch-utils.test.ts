import {
  esClientMockWithoutIndex,
  esClientMockWithIndex,
  esClientMockWithErrors,
  esClientMockWithException,
} from "../../mocks/elasticsearch/elasticsearch-utils.mock";
import { documents, bulkInsertResponse } from "../../data/elasticsearch/elasticsearch-utils-data";
import { bulkInsert } from "src/utils/elasticsearch/elasticsearch-utils";
import { ELASTICSEARCH_INDEX_NAME } from 'src/config';
import mapping from 'src/utils/elasticsearch/mapping.json';
import client from "src/utils/elasticsearch/client";
jest.mock("src/utils/elasticsearch/client", () => ({
  client: {},
}));

describe("Elasticsearch Utilities", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should creates es index when it doesn't exists", async () => {
    Object.assign(client, esClientMockWithoutIndex);
    await bulkInsert([]);
    expect(esClientMockWithoutIndex.indices.exists).toHaveBeenCalled();
    expect(esClientMockWithoutIndex.indices.create).toHaveBeenCalledWith({
      index: ELASTICSEARCH_INDEX_NAME,
      body: mapping
    });
  });

  test("should not create es index when exists", async () => {
    Object.assign(client, esClientMockWithIndex);
    await bulkInsert([]);
    expect(esClientMockWithIndex.indices.exists).toHaveBeenCalled();
    expect(esClientMockWithIndex.indices.create).not.toHaveBeenCalled();
  });


  test("should log an error for an item that fails during bulk insert", async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
    Object.assign(client, esClientMockWithErrors);
    await bulkInsert([]);
    expect(esClientMockWithErrors.bulk).toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalledWith('Failed [index] on _id=1');
  });

  test("should log error when there exception while bulk insert", async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
    Object.assign(client, esClientMockWithException);
    await bulkInsert([]);
    expect(esClientMockWithException.bulk).toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalledWith("Bulk insert error:", Error('Bulk insert failed'));
  });


  test("should log success error if items are inserted successfully", async () => {
    const consoleInfoMock = jest.spyOn(console, 'info').mockImplementation(() => { });
    Object.assign(client, esClientMockWithIndex);
    await bulkInsert(documents);
    expect(esClientMockWithIndex.bulk).toHaveBeenCalled();
    expect(esClientMockWithIndex.bulk).toHaveBeenCalledWith(bulkInsertResponse);
    expect(consoleInfoMock).toHaveBeenCalledWith('All documents indexed successfully');
  });
});
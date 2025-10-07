
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

export {
  esClientMockWithoutIndex,
  esClientMockWithIndex,
  esClientMockWithErrors,
  esClientMockWithException
};

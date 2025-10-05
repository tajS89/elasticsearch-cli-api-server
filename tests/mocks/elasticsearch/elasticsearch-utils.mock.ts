
const esClientMock = {
  indices: {
    exists:
      jest.fn().mockResolvedValue({ body: false }),
    create: jest.fn().mockResolvedValue({ body: {} }),
  },
  bulk: jest.fn().mockResolvedValue({ body: { errors: false, items: [] } }),
  search: jest.fn().mockResolvedValue({ body: { hits: { hits: [] } } }),
};

export { esClientMock };

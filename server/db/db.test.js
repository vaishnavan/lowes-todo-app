const mongoose = require('mongoose');
const connectToMongoDB = require('./db');

describe('connectToMongoDB', () => {
  const oldEnv = process.env.MONGO_DB;
  beforeAll(() => {
    process.env.MONGO_DB = 'mongodb://mock-mongodb-uri';
  });

  afterAll(() => {
    process.env.MONGO_DB = oldEnv;
  });

  it('should handle connection errors', async () => {
    const connectMock = jest.spyOn(mongoose, 'connect');

    const consoleLogMock = jest.spyOn(console, 'log');

    await connectToMongoDB();

    expect(connectMock).toHaveBeenCalledWith('mongodb://mock-mongodb-uri');

    connectMock.mockRestore();
    consoleLogMock.mockRestore();
  });
});

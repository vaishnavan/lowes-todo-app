const http = require('http');
const app = require('./index');

describe('Server', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(8000);
  });

  afterAll(() => {
    server.close();
  });

  it('should start listening on the specified port', async () => {
    expect(server.listening).toBeTruthy();
    expect(server.address().port).toBe(8000);
  });
});

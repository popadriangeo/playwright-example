const request = require('supertest')('https://api.open-meteo.com/v1');
const assert = require('chai').assert;

describe('Weather Forecast Api', () => {
  it('GET /forecast', () => {
    return request
       // Make a GET request to /forecast route
      .get('/forecast?latitude=52.52&longitude=13.41')
      // Assert 200 HTTP response code
      .expect(200)
      // Assert Content-type
      .expect('Content-Type', /json/)
      .then((res) => {
        // Verify data being returned to not be empty
        assert.isNotEmpty(res.body);
      });
  });
});
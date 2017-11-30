const request = require('supertest');
const createExpressApp = require('./index.js');

let configStub;

beforeAll(() => {
  configStub = {
    server: {
      url: 'https://localhost:8080'
    },
    hypernova: {
      url: 'https://localhost:8080'
    },
    env: {
      isDev: false,
      isTest: false,
      isProduction: false
    },
    paths: {
      dist: () => '/foo/bar',
      static: () => '/foo/bar'
    }
  };
});

describe('createExpressApp()', () => {
  it('should be a function.', () => {
    expect(typeof createExpressApp).toBe('function');
  });

  it('should return an express app when running in the dev environment', () => {
    const devConfigStub = Object.assign({}, configStub, {
      env: Object.assign({}, configStub.env, {
        isDev: true
      })
    });
    const app = createExpressApp(devConfigStub);

    expect(typeof app).toBe('function');
  });

  it('should return an express app when running in the live environment', () => {
    const liveConfigStub = Object.assign({}, configStub, {
      env: Object.assign({}, configStub.env, {
        isProduction: true
      })
    });
    const app = createExpressApp(liveConfigStub);

    expect(typeof app).toBe('function');
  });
});

describe('createExpressApp() -> app()', () => {
  it('should return valid JSON when requesting a GET on "/manage/health.json".', done => {
    const app = createExpressApp(configStub);

    request(app)
      .get('/manage/health.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          status: 'UP'
        },
        done
      );
  });
});

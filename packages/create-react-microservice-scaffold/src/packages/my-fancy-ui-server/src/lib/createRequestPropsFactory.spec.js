const mockFs = require('mock-fs');
const createRequestPropsFactory = require('./createRequestPropsFactory.js');

describe('createRequestPropsFactory()', () => {
  beforeEach(() => {
    mockFs(
      {
        '/foo/bar/bundle.js': `
module.exports = {
  getInitialProps: () => ({
    foo: 'bar'
  })
}`
      },
      {
        createCwd: false,
        createTmp: false
      }
    );
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('should return a function.', () => {
    const createRequestProps = createRequestPropsFactory({
      bundlePath: '/foo/bar/bundle.js',
      hypernovaComponentId: 'foo-bar'
    });

    expect(typeof createRequestProps).toBe('function');
  });

  it('should read and evaluate the bundlePath and resolve with a Promise containing the incomming query and initialState.', async () => {
    const createRequestProps = createRequestPropsFactory({
      bundlePath: '/foo/bar/bundle.js',
      hypernovaComponentId: 'foo-bar'
    });
    const query = {baz: 'qux'};

    const hypernovaQuery = await createRequestProps({query});

    expect(hypernovaQuery).toMatchSnapshot();
  });
});

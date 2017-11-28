// @flow

const create = require('create-any-cli');
const Command = require('./../lib/command.js');
const DefaultCommand = require('./default.js');

describe('DefaultCommand', () => {
  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof DefaultCommand).toBe('function');
  });
});

describe('new Command().exec()', () => {
  let instance;
  let processTemplateAndCreate;
  let resolveAndPromptTemplateArgs;
  let resolveDistFolder;
  let resolveAppName;
  let fail;
  let exec;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    processTemplateAndCreate = jest.spyOn(create, 'processTemplateAndCreate').mockImplementation(jest.fn());
    resolveAndPromptTemplateArgs = jest.spyOn(instance, 'resolveAndPromptTemplateArgs').mockImplementation(jest.fn(() => ({someArg: 'foo'})));
    resolveDistFolder = jest.spyOn(instance, 'resolveDistFolder').mockImplementation(jest.fn(() => '/foo/bar/my fancy app'));
    resolveAppName = jest.spyOn(instance, 'resolveAppName').mockImplementation(jest.fn(() => 'my fancy app'));
    fail = jest.spyOn(instance, 'fail').mockImplementation(jest.fn());
    exec = jest.spyOn(Command, 'exec').mockImplementation(jest.fn());
    jest.spyOn(instance, 'log').mockImplementation(jest.fn());
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.exec).toBe('function');
  });

  it('should resolve the dist folder, the app name and template args', async () => {
    await instance.exec();

    expect(resolveAppName).toHaveBeenCalledTimes(1);
    expect(resolveDistFolder).toHaveBeenCalledTimes(1);
    expect(resolveAndPromptTemplateArgs).toHaveBeenCalledTimes(1);
  });

  it('should create the template with the resolve arguments', async () => {
    await instance.exec();

    expect(processTemplateAndCreate).toHaveBeenCalledTimes(1);
  });

  it('should install all dependencies and bootstrap the application', async () => {
    await instance.exec();

    expect(exec).toHaveBeenCalledTimes(2);
    expect(exec).toHaveBeenCalledWith('yarn', ['install'], {cwd: '/foo/bar/my fancy app'});
    expect(exec).toHaveBeenCalledWith('yarn', ['run', 'bootstrap'], {cwd: '/foo/bar/my fancy app'});
  });

  it('should call the fail method if the execution of one of the commands failed', async () => {
    exec
      .mockReturnValueOnce(Promise.resolve())
      .mockReturnValueOnce(Promise.reject(new Error('Nope')));
    await instance.exec();

    expect(fail).toHaveBeenCalledTimes(1);
  });
});

describe('new Command().resolveAndPromptTemplateArgs()', () => {
  let instance;
  let resolveAndPromptOptions;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    resolveAndPromptOptions = jest.spyOn(create, 'resolveAndPromptOptions').mockImplementation(jest.fn(() => ({someArg: 'foo'})));
    jest.spyOn(instance, 'resolveAppName').mockImplementation(jest.fn(() => 'my fancy app'));
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.resolveAndPromptTemplateArgs).toBe('function');
  });

  it('should call the create.resolveAndPromptOptions method and merge the resolve arguments with the resolved name', async () => {
    const args = await instance.resolveAndPromptTemplateArgs();

    expect(resolveAndPromptOptions).toHaveBeenCalledTimes(1);
    expect(args).toMatchSnapshot();
  });
});


describe('new Command().resolveDistFolder()', () => {
  let instance;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    jest.spyOn(process, 'cwd').mockImplementation(jest.fn(() => '/usr/src/foo'));
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.resolveDistFolder).toBe('function');
  });

  it('should return a string contains the processes cwd and the input if provided', async () => {
    let cwd = await instance.resolveDistFolder();

    expect(cwd).toContain('/usr/src/foo');

    instance.input = ['my', 'fancy', 'folder'];
    cwd = await instance.resolveDistFolder();

    expect(cwd).toContain('/usr/src/foo/my fancy folder');
  });
});

describe('new Command().resolveAppName()', () => {
  let instance;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    jest.spyOn(process, 'cwd').mockImplementation(jest.fn(() => '/usr/src/foo'));
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.resolveAppName).toBe('function');
  });

  it('should return a string contains the processes cwd and the input if provided', async () => {
    instance.input = ['my', 'fancy', 'folder'];

    const name = await instance.resolveAppName();

    expect(name).toBe('my fancy folder');
  });
});

describe('new Command().onFile()', () => {
  let instance;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.onFile).toBe('function');
  });

  it('should return an object containing the spinner ora instance', async () => {
    const context = await instance.onFile();

    expect(typeof context).toBe('object');
    expect(typeof context.spinner).toBe('object');
    expect(typeof context.spinner.start).toBe('function');
  });
});

describe('new Command().onInvalidDistDir()', () => {
  let instance;
  let fail;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    fail = jest.spyOn(instance, 'fail').mockImplementation(jest.fn());
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.onInvalidDistDir).toBe('function');
  });

  it('should call the "fail" method', async () => {
    await instance.onInvalidDistDir('foo');

    expect(fail).toHaveBeenCalledTimes(1);
  });
});

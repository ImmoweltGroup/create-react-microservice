// @flow

const Command = require('./command.js');

describe('Command()', () => {
  it('should be a function', () => {
    expect(typeof Command).toBe('function');
  });
});

describe('new Command().log()', () => {
  let instance;
  let createLogMsg;

  beforeEach(() => {
    instance = new Command({input: [], flags: {}, pkg: {}});
    createLogMsg = jest
      .spyOn(instance, 'createLogMsg')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.log).toBe('function');
  });

  it('should execute the given ora method with the provided args', async () => {
    const start = jest.fn();
    instance.spinner = {start};
    createLogMsg.mockReturnValue('foo');

    await instance.log('start', 'foo');

    expect(start).toHaveBeenCalledTimes(1);
    expect(createLogMsg).toHaveBeenCalledTimes(1);
  });
});

describe('new Command().createLogMsg()', () => {
  let instance;

  beforeEach(() => {
    instance = new Command({input: [], flags: {}, pkg: {}});
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.createLogMsg).toBe('function');
  });

  it('should return a string that can be logged depending on how my arguments where given', () => {
    expect(instance.createLogMsg('foo')).toContain('foo');
    expect(instance.createLogMsg('foo', 'bar')).toContain('foo');
    expect(instance.createLogMsg('foo', 'bar')).toContain('bar');
    expect(instance.createLogMsg('foo', 'bar', 'baz')).toContain('foo');
    expect(instance.createLogMsg('foo', 'bar', 'baz')).toContain('bar');
    expect(instance.createLogMsg('foo', 'bar', 'baz')).toContain('baz');
  });
});

describe('new Command().fail()', () => {
  let instance;
  let exit;
  let log;

  beforeEach(() => {
    instance = new Command({input: [], flags: {}, pkg: {}});
    exit = jest.spyOn(process, 'exit').mockImplementation(jest.fn());
    log = jest.spyOn(instance, 'log').mockImplementation(jest.fn());
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.fail).toBe('function');
  });

  it('should call the log method and propagate all arguments to it', () => {
    instance.fail('foo', 'bar');

    expect(log).toHaveBeenCalledWith('fail', 'foo', 'bar');
    expect(exit).toHaveBeenCalledWith(1);
  });
});

describe('new Command().suspendLogging()', () => {
  let instance;

  beforeEach(() => {
    instance = new Command({input: [], flags: {}, pkg: {}});
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.suspendLogging).toBe('function');
  });

  it('should call the "stopAndPersist" method of the spinner instance', () => {
    const stopAndPersist = jest.fn();
    instance.spinner = {stopAndPersist};

    instance.suspendLogging();

    expect(stopAndPersist).toHaveBeenCalledTimes(1);
  });
});

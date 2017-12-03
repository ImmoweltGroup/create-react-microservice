// @flow

jest.mock('./../lib/file.js');

const create = require('create-any-cli');
const Command = require('./../lib/command.js');
const file: any = require('./../lib/file.js');
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
  let setupGitRepository;
  let fail;
  let exec;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    processTemplateAndCreate = jest
      .spyOn(create, 'processTemplateAndCreate')
      .mockImplementation(jest.fn());
    resolveAndPromptTemplateArgs = jest
      .spyOn(instance, 'resolveAndPromptTemplateArgs')
      .mockImplementation(jest.fn(() => ({someArg: 'foo', gitRepoUrl: {}})));
    resolveDistFolder = jest
      .spyOn(instance, 'resolveDistFolder')
      .mockImplementation(jest.fn(() => '/foo/bar/my fancy app'));
    resolveAppName = jest
      .spyOn(instance, 'resolveAppName')
      .mockImplementation(jest.fn(() => 'my fancy app'));
    setupGitRepository = jest
      .spyOn(instance, 'setupGitRepository')
      .mockImplementation(jest.fn());
    fail = jest.spyOn(instance, 'fail').mockImplementation(jest.fn());
    exec = jest.spyOn(Command, 'exec').mockImplementation(jest.fn());
    jest
      .spyOn(instance, 'resolveScaffold')
      .mockImplementation(
        jest.fn(() => '/foo/src/create-react-microservice-scaffold/src')
      );
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
    expect(exec).toHaveBeenCalledWith('yarn', ['install'], {
      cwd: '/foo/bar/my fancy app'
    });
    expect(exec).toHaveBeenCalledWith('yarn', ['run', 'bootstrap'], {
      cwd: '/foo/bar/my fancy app'
    });
  });

  it('should setup the git repository', async () => {
    await instance.exec();

    expect(setupGitRepository).toHaveBeenCalledTimes(1);
  });

  it('should call the fail method if the execution of one of the commands failed', async () => {
    exec
      .mockReturnValueOnce(Promise.resolve())
      .mockReturnValueOnce(Promise.reject(new Error('Nope')));
    await instance.exec();

    expect(fail).toHaveBeenCalledTimes(1);
  });
});

describe('new Command().resolveScaffold()', () => {
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
    expect(typeof instance.resolveScaffold).toBe('function');
  });

  it('should resolve all node_modules and find the first one that holds the "create-react-microservice-scaffold" package', async () => {
    file.findNodeModules.mockReturnValueOnce([
      '../node_modules',
      '../../node_modules'
    ]);
    file.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(true);
    file.require.mockReturnValueOnce({main: 'foo/bar'});

    const src = await instance.resolveScaffold();

    expect(src).toContain('/foo/bar');
  });
});

describe('new Command().resolveAndPromptTemplateArgs()', () => {
  let instance;
  let resolveAndPromptOptions;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    resolveAndPromptOptions = jest
      .spyOn(create, 'resolveAndPromptOptions')
      .mockImplementation(jest.fn(() => ({someArg: 'foo'})));
    jest
      .spyOn(instance, 'resolveAppName')
      .mockImplementation(jest.fn(() => 'my fancy app'));
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
    jest
      .spyOn(process, 'cwd')
      .mockImplementation(jest.fn(() => '/usr/src/foo'));
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
    jest
      .spyOn(process, 'cwd')
      .mockImplementation(jest.fn(() => '/usr/src/foo'));
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

describe('new Command().onTemplate()', () => {
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
    expect(typeof instance.onTemplate).toBe('function');
  });

  it('should setup the .', async () => {
    const input = `https://github.com/my-user/my-repo.git, my-fancy-ui`;

    const output = await instance.onTemplate(input, {
      name: {
        camelCase: 'fooUi',
        kebabCase: 'foo-ui',
        lowerCase: 'foo ui',
        raw: 'Foo ui',
        snakeCase: 'foo_ui',
        startCase: 'Foo ui',
        upperCamelCase: 'FooUi'
      },
      npmScope: {
        camelCase: '@myScope',
        kebabCase: '@my-scope',
        lowerCase: '@my-scope',
        raw: '@my-scope',
        snakeCase: '@my_scope',
        startCase: '@my-scope',
        upperCamelCase: '@myScope'
      },
      license: {
        camelCase: 'MIT',
        kebabCase: 'MIT',
        lowerCase: 'MIT',
        raw: 'MIT',
        snakeCase: 'MIT',
        startCase: 'MIT',
        upperCamelCase: 'MIT'
      },
      gitRepoUrl: {
        camelCase: 'https://github.com/fancy-user/fancy-repo.git',
        kebabCase: 'https://github.com/fancy-user/fancy-repo.git',
        lowerCase: 'https://github.com/fancy-user/fancy-repo.git',
        raw: 'https://github.com/fancy-user/fancy-repo.git',
        snakeCase: 'https://github.com/fancy-user/fancy-repo.git',
        startCase: 'https://github.com/fancy-user/fancy-repo.git',
        upperCamelCase: 'https://github.com/fancy-user/fancy-repo.git'
      }
    });

    expect(output).toBe('https://github.com/fancy-user/fancy-repo.git, foo-ui');
  });
});

describe('new Command().setupGitRepository()', () => {
  let instance;
  let resolveDistFolder;
  let exec;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    resolveDistFolder = jest
      .spyOn(instance, 'resolveDistFolder')
      .mockImplementation(jest.fn(() => '/foo/bar/my fancy app'));
    exec = jest.spyOn(Command, 'exec').mockImplementation(jest.fn());
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof instance.setupGitRepository).toBe('function');
  });

  it('should setup the git repository with the provided remote origin URL in the resolved CWD.', async () => {
    const opts = {
      cwd: '/foo/bar/my fancy app'
    };

    await instance.setupGitRepository(
      'https://github.com/fancy-user/fancy-repo.git'
    );

    expect(resolveDistFolder).toHaveBeenCalledTimes(1);
    expect(exec).toHaveBeenCalledTimes(3);
    expect(exec).toHaveBeenCalledWith('git', ['init'], opts);
    expect(exec).toHaveBeenCalledWith(
      'git',
      [
        'remote',
        'add',
        'origin',
        'https://github.com/fancy-user/fancy-repo.git'
      ],
      opts
    );
    expect(exec).toHaveBeenCalledWith(
      'yarn',
      ['add', '--dev', '-W', 'husky'],
      opts
    );
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

describe('new Command().safelyCreateNpmScopeArg()', () => {
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
    expect(typeof instance.safelyCreateNpmScopeArg).toBe('function');
  });

  it('should return an empty string if no argument was given', async () => {
    expect(instance.safelyCreateNpmScopeArg()).toBe('');
  });

  it('should return an processed string without special characters and prepend the at as well as append the slash to the returned string', async () => {
    expect(instance.safelyCreateNpmScopeArg('foo bar23-baz')).toBe(
      '@foo-bar-baz/'
    );
  });
});

describe('new Command() on template hooks', () => {
  let instance;
  let opts;

  beforeEach(() => {
    instance = new DefaultCommand({input: [], flags: {}});
    opts = {
      filePaths: {
        dist: 'fooDist',
        src: 'fooSrc'
      },
      data: {
        raw: 'foo',
        processed: 'bar'
      },
      context: {
        spinner: {
          start: jest.fn(),
          succeed: jest.fn()
        }
      }
    };
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should call the "context.spinner.start" method when invoking the "onBeforeReadFile" method', async () => {
    await instance.onBeforeReadFile(opts);

    expect(opts.context.spinner.start).toHaveBeenCalledTimes(1);
  });

  it('should call the "context.spinner.start" method when invoking the "onBeforeProcessFile" method', async () => {
    await instance.onBeforeProcessFile(opts);

    expect(opts.context.spinner.start).toHaveBeenCalledTimes(1);
  });

  it('should call the "context.spinner.start" method when invoking the "onBeforeWriteFile" method', async () => {
    await instance.onBeforeWriteFile(opts);

    expect(opts.context.spinner.start).toHaveBeenCalledTimes(1);
  });

  it('should call the "context.spinner.start" method when invoking the "onAfterWriteFile" method', async () => {
    await instance.onAfterWriteFile(opts);

    expect(opts.context.spinner.succeed).toHaveBeenCalledTimes(1);
  });
});

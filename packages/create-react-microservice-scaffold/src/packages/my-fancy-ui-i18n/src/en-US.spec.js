// @flow

import * as translations from './en-US.js';

describe('translations[`en-US`]', () => {
  it('should be a object.', () => {
    expect(typeof translations).toBe('object');
  });

  it('`application.hello` should render a prop that matches the key `name`.', () => {
    expect(translations.application.hello).toContain('%{name}');
  });
});

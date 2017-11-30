import {Selector, Role} from 'testcafe';
import ReactSelector from 'testcafe-react-selectors';
import config from '@company-scope/my-fancy-ui-config';

fixture`Getting Started`.page`${config.server.url}`;

test('Rendered the list of Comments', async t => {
  const content = Selector('.page-content');

  await t
    .expect(content.find('.mdl-card').exists)
    .ok('got rendered with Comments');
});

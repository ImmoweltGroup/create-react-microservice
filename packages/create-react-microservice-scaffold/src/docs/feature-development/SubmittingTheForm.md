# Submitting the data to an API

In this chapter we will finalize our feature by integrating the submit logic on the Form's button.

## Table of Contents

- [Handling asynchronous tasks with redux-saga](#handling-async-tasks-with-redux-saga)
- [Creating the `actionTypes` and `actions`](#creating-the-actionTypes-and-actions)
- [Creating the reset-form `actionHandler`](#creating-the-reset-form-actionHandler)
- [Connecting the button with the `action`](#connecting-the-ui)
- [Creating a saga](#creating-a-saga)
- [Retrieving data and handling network requests in a saga](#retrieving-data-network-requests-saga)
- [Writing tests for the saga](#writing-tests-for-the-saga)


<a id="handling-async-tasks-with-redux-saga"></a>
## Handling asynchronous tasks with redux-saga
We are handling asynchronous tasks in our application with `redux-saga`, due to it's extremely flexible and atomic nature it solves almost all use cases you and your team could come up and in combination with our `redux-lumbergh` package the code becomes as declarative as possible.

In our very case a saga would listen on store dispatches for a given `actionType` to be dispatched, query the current form data from the store and create a `POST` to a fictive API, and once successfully resolved reset the form and reload the comments to reflect the new data.

<a id="creating-the-actionTypes-and-actions"></a>
## Creating the `actionTypes` and `actions`
When inspecting our requirements above we can easily spot 3 `actionTypes` and the corresponding `actions` that we need to implement this requirement/feature.

1. A actionType and action to trigger the submit which the button will dispatch on click.
2. A actionType and action to reset the form once the request was successful
3. A actionType and action to reload the comments (Already present)

So let's go ahead and create the first two `actionTypes` and `actions` in `packages/my-fancy-ui/src/store/modules/comments/actions.js`.

```js
const actionTypes = {
  // ... Pre-Existing actionTypes ...
  SUBMIT_COMMENT_FORM: createActionType('SUBMIT_COMMENT_FORM'),
  RESET_COMMENT_FORM: createActionType('RESET_COMMENT_FORM')
};

// ... Pre-Existing actions ...

//
// Again we need to create the corresponding actions. Both of them don't need a payload so we can omit the second argument to the `createAction` function.
//
const submitCommentForm = createAction(actionTypes.SUBMIT_COMMENT_FORM);
const resetCommentForm = createAction(actionTypes.RESET_COMMENT_FORM);

const actions = {
  // ... Other actions that are exported ...

  submitCommentForm,
  resetCommentForm
};
```

Again create unit tests in the same way you did before for the `setCommentFormPropertyValue` action and you are done with this bit! :-)


<a id="creating-the-reset-form-actionHandler"></a>
## Creating the reset-form `actionHandler`
Afterwards let's write our reset from state `actionHandler`, again head into the `packages/my-fancy-ui/src/containers/CommentForm/index.js` file and paste in the actionHandler for the `RESET_COMMENT_FORM` `actionType`.

```js
const ACTION_HANDLERS = {
  // ... Pre-Existing actionHandlers ...

  //
  // Again we return a set instruction in the actionHandler.
  // But first we retrieve the initialState of the `form.valuesByPropertyKey` object and use it as our new value.
  // That is the most basic form of a state reset in redux.
  //
  [actionTypes.RESET_COMMENT_FORM]: () => {
    const path = ['form', 'valuesByPropertyKey'];
    const initialValues = $get(path, initialState);

    return $set(
      path,
      initialValues
    );
  }
};
```

To fully complete this section, again write unit tests in the same way you did with the previously created `actionHandler`.


<a id="connecting-the-ui"></a>
## Connecting the button with the `action`
Great! Let's continue with connecting the `submitCommentForm` action and the Forms button! Jump into the code of the `CommentForm` container (`packages/my-fancy-ui/src/containers/CommentForm/index.js`) and import the actions of our comment redux module as well as configure the `mapActionCreatorsToProps` function.

```js
// ... other types ...
type DispatchPropsType = {
  onSubmit: Function
};
type PropsType = OwnPropsType & StatePropsType & DispatchPropsType;

// ... other imports ...
import React, {Component} from 'react';
import {actions as commentsActions} from './../../store/modules/comments/';

class CommentForm extends Component<PropsType> {
  render() {
    return (
      <form>
        // ... additional JSX markup ...

        <input onClick={this.handleFormSubmit} type="submit" value={i18n.t('comments.form.submit')} />
      </form>
    );
  }
  
  handleFormSubmit = (e) => {
    e.preventDefault();

    this.props.submitCommentForm();
  }
};

// ... configuration of the `mapStateToProps` ...
const mapDispatchToProps: DispatchPropsType = {
  submitCommentForm: commentsActions.submitCommentForm
};

// ... connect HOC configuration and exports ...
```

Save the file and view the application in a browser. Once you submit the form the nothing should happen, that's why we need to create the saga now which reacts on the `SUBMIT_COMMENT_FORM` `actionType`.


<a id="creating-a-saga"></a>
## Creating a saga
Once we connected everything we need to do one final thing - Creating the saga which handles the asynchronous nature of network requests and conditional dispatching of other actions. Head into the `packages/my-fancy-ui/src/store/modules/comments/sagas/` folder and create a new file named `handleFormSubmit.js` and paste the following code into it.

```js
// @flow

//
// Let's import some utilities we need to create the saga.
//
import {takeLatest} from 'redux-saga/effects';
import {createEnvironmentSpecificSaga} from 'redux-lumbergh';
import {
  actionTypes as commentsActionTypes
} from './../actions.js';

//
// This is the generator function that will contain the business logic.
//
export function* handleFormSubmit(): Generator<> {
  console.log('form was submitted');
}

//
// We also create another generator function which is responsible for the listening on the store.
// Using the `takeLatest` we can easily listen on store dispatches and execute the given (generator) function.
//
// In our case we listen for dispatches of actions that have the type `commentsActionTypes.SUBMIT_COMMENT_FORM` and execute
// our previously defined generator function.
//
export function* watchHandleFormSubmit(): Generator<> {
  yield takeLatest(commentsActionTypes.SUBMIT_COMMENT_FORM, handleFormSubmit);
}

//
// We export a list of environment aware sagas, this way you can declaratively define in which environment you want your saga to be executed.
// Since our logic expects user input before it can be triggered (submit of the form) we will only execute our watch on the client.
//
// Note: Watch processes will not resolve, so having them on the server will always resolve in an never ending request!
//
export default [
  createEnvironmentSpecificSaga.client(watchHandleFormSubmit)
];
```

Awesome, one last thing, we need to register the sagas in your module, jump into the `packages/my-fancy-ui/src/store/modules/comments/sagas/index.js` file and import your list of sagas and export them right away so the application is aware of them.

```js
// @flow

import fetchCommentsSagas from './fetchComments.js';
import handleFormSubmitSagas from './handleFormSubmit.js';

export default [
  ...fetchCommentsSagas,
  ...handleFormSubmitSagas
];
```

Viewing your app in a browser and clicking on the button should now log the `form was submitted` message to the console, go ahead and try it out!


<a id="retrieving-data-network-requests-saga"></a>
## Retrieving data and handling network requests in a saga
Now that we've got the saga working, let's find out how to query data from the redux store and handle network requests in a saga. Open your source file of the saga (`packages/my-fancy-ui/src/store/modules/comments/sagas/handleFormSubmit.js`) and add the following code to it.

```js
//
// `redux-saga` consists of effects, these are utility functions which communicate with the saga middleware under the hood.
//
// Since we want to select / query something from the redux state, we need to import the `select` effect.
//
import {select, takeLatest} from 'redux-saga/effects';

export function* handleFormSubmit(): Generator<> {
  //
  // In a generator you have to yield your instructions to the callee.
  // All effects of redux-saga as well as functions that return a Promise should be yielded!
  //
  // Calling the select effect without any arguments will return you the whole redux state - Go ahead and try it out! :-)
  //
  const state = yield select();

  console.log(state);
}
```

But haven't we the concept of dedicated `selectors` for this task you might ask? Yes! To reduce code duplication we can use `selectors` with the `select` effect! Taking a look at the existing `selectors` we will find that we don't have a `selector` to query all values of the form state. Let's create one in the `packages/my-fancy-ui/src/store/modules/comments/selectors.js` file...

```js
// ... Pre-Existing selectors ...

export const getCommentFormDataValues = (state: StateType): CommentType => $get(['comments', 'form', 'valuesByPropertyKey'], state);
```

... and head back into our saga, import it and use it!

```js
// ... other types and imports ...

import {getCommentFormDataValues} from './../selectors.js';

export function* handleFormSubmit(): Generator<> {
  const data = yield select(getCommentFormDataValues);

  console.log(data);
}

// ... other sagas and exports ...
```

We are going places! Let's finalize the saga by adding the network request logic.

```js
import {call, put, select, takeLatest} from 'redux-saga/effects';
// ... other types and imports ...

export function* handleFormSubmit(): Generator<> {
  const data = yield select(getCommentFormDataValues);

  //
  // Error handling in generator functions can be done the same way as with async functions,
  // using the traditional `try / catch`.
  //
  try {
    //
    // Using the call effect is important once you want to assert / test your sagas, the first argument is the function to call and the remaining arguments will be propagated to the function.
    // In our case we call the fetch API with two arguments, the first is the URL and are the second the request options.
    //
    yield call(fetch, 'http://your-api.com/comments', {
      method: 'POST',
      body: data
    });
  } catch (e) {}

  yield put(commentsActions.resetCommentForm());
}

// ... other sagas and exports ...
```


<a id="writing-tests-for-the-saga"></a>
## Writing tests for the saga
As with the actions, reducers and components we also want to cover our saga logic with unit tests, to achieve this create a `[filename].spec.js` file besides your source file, in our case `handleFormSubmit.spec.js` and insert the following code into it.

```js
import {expectSaga} from 'redux-saga-test-plan';
import {handleFormSubmit, watchHandleFormSubmit} from './handleFormSubmit.js';

describe('handleFormSubmit()', () => {
  //
  // Since we use global functions that should not conflict with our test, we need to mock them beforehand.
  //
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ok: true}));
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  //
  // Our first test case is that the imported function should be a generator function.
  //
  it('should be a generator function.', () => {
    expect(typeof handleFormSubmit).toBe('function');
    expect(typeof handleFormSubmit().next).toBe('function');
  });

  //
  // Afterwards we test the default behavior via snapshots. In case your saga has conditional code branches you should add an assertion for each branch.
  //
  it('should query the valuesByPropertyKey from the store and POST the data to the API.', async function() {
    const state = {
      comments: {
        form: {
          valuesByPropertyKey: {foo: 'bar'}
        }
      }
    };
    const result = await expectSaga(handleFormSubmit).withState(state).run();

    expect(result.toJSON()).toMatchSnapshot();
  });
});

//
// We will also test the watch saga, since it does not contain any specific logic, a simple execution test should be enough.
// Note that using snapshots would pollute your test runner output with timeout warnings.
//
describe('watchHandleFormSubmit()', () => {
  it('should be a generator function.', () => {
    expect(typeof watchHandleFormSubmit).toBe('function');
    expect(typeof watchHandleFormSubmit().next).toBe('function');
  });
});
```

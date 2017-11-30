# Thinking in Redux

In this chapter we will create the API to interact with redux the redux store for our new feature.

## Table of Contents

- [Writing the state structure for our feature](#writing-the-state-structure)
- [How would an store interaction API look like (Creating actions)](#creating-the-actions)
- [Adding unit tests for the actions](#adding-test-for-the-actions)
- [Creating action handlers (Reducer logic to apply incoming data to the store)](#creating-action-handlers)
- [Adding unit tests for the actionHandler](#adding-test-for-the-action-handler)
- [Creating selectors to query data from the redux store](#creating-selectors)
- [Adding unit tests for the selector](#adding-test-for-the-selector)


<a id="writing-the-state-structure"></a>
## Writing the state structure for our feature
We recommend to always start of by thinking about your necessary data structure that your feature needs as well as inspecting other store modules and their state to find the most suitable place or if the data even already exists.

In our case the scaffold already holds a `comments` store module, so lets inspect the `initialState` of the module in `packages/my-fancy-ui/store/modules/comments/index.js`. Out of the box it only holds an empty `commentsById` object, so lets add an initialState structure which holds all values of the created form.

```js
const initialState: StateType = {
  commentsById: {},
  form: {
    valuesByPropertyKey: {
      postId: '',
      id: '',
      email: '',
      name: '',
      body: ''
    }
  }
};
```

**Note:** Always think ahead when adding or modifying the state structure - The way we wrote it here we could easily add other properties to the form state in the future.

Let's also keep the typings in sync, jump into the `types.js` file which you can find in the same folder and adjust it.

```js
// ... Pre-Existing types ...

export type StateType = {
  // ... Pre-Existing state type properties ...

  form: {
    valuesByPropertyKey: CommentType
  }
};
```


<a id="creating-the-actions"></a>
## How would an store interaction API look like (Creating actions)
Since we now have the data structure in place, let's think about the best possible API with which we can interact with the store to fill the properties of the `form.valuesByPropertyKey` object.

We could either create a very descriptive API, or a more generic one. We recommend to always consider the bundle size, sometimes a generic API is smaller in size since you need less `actionTypes` / `actions`. Let's create an `actionType` and the corresponding `action` for the more generic approach in `packages/my-fancy-ui/store/modules/comments/actions.js`.

```js
const actionTypes = {
  // ... Pre-Existing actionTypes ...
  SET_COMMENT_FORM_PROPERTY_VALUE: createActionType('SET_COMMENT_FORM_PROPERTY_VALUE')
};

// ... Pre-Existing actions ...

//
// For each action we create a separate payload type which we will re-use in the reducer annotation.
// In this example we make use of the `$Keys` utility type of Flow, this type will create a new enum type of the keys of the given Object/Type, so in our case one of the possible property keys of the data model.
//
export type SetCommentFormPropertyValuePayloadType = {propertyKey: $Keys<CommentType>, value: string};

//
// Next of we create the `action`, the first argument matches the previously created `actionType`, the second argument is the function signature / payload creator.
//
const setCommentFormPropertyValue = createAction(
  actionTypes.SET_COMMENT_FORM_PROPERTY_VALUE,
  (propertyKey: $Keys<CommentType>, value: string): SetCommentFormPropertyValuePayloadType => ({
    propertyKey,
    value
  })
);

const actions = {
  // ... Other actions that are exported ...

  setCommentFormPropertyValue
};
```

With flow enabled, calling the `setCommentFormPropertyValue` function with an invalid property key as the first argument will now throw errors.


<a id="adding-test-for-the-actions"></a>
## Adding unit tests for the actions
Adding unit tests for the created action is pretty simple, jump into the `actions.spec.js` file and add the following test assertion which makes use of snapshot testing.

```js
// ... Pre-Existing tests ...

it('actions.setCommentFormPropertyValue() should create a payload containing the passed key and value', () => {
  const result = actions.setCommentFormPropertyValue('body', 'foo bar');

  expect(result).toMatchSnapshot();
});
```


<a id="creating-action-handlers"></a>
## Creating action handlers (Reducer logic to apply incoming data to the store)
Now that we defined the API to interact with the store, lets create an `actionHandler` which will mutate the state based on the incoming `action`. You will find the actionHandlers beneath the `initialState` of the module in `packages/my-fancy-ui/store/modules/comments/index.js`.

First of all lets import the payload type that we created for the `setCommentFormPropertyValue` action, e.g.

```js
import type {
  // ... Pre-Existing type imports ...
  SetCommentFormPropertyValuePayloadType
} from './actions.js';

// ... Other imports and the `initialState` definition ...

const ACTION_HANDLERS = {
  // ... Pre-Existing actionHandlers ...

  //
  // Using the enhanced object literal feature of ES6 we can interpolate a variable as a key of an object.
  // In this case we set the key as the contents of our actionType and the value is a function - the `actionHandler`.
  //
  // The `actionHandler` receives the `SetCommentFormPropertyValuePayloadType` as the first and only argument and we simply
  // return a set instruction of `plow-js` mapping to set `payload.value` to the path `state.form.valuesByPropertyKey.${payload.propertyKey}`.
  //
  // Note that we can safely omit the third argument to all functions of `plow-js` when returned in a `actionHandler`
  // since our reducer takes care of the third argument automatically.
  //
  [actionTypes.SET_COMMENT_FORM_PROPERTY_VALUE]: (
    payload: SetCommentFormPropertyValuePayloadType
  ) => $set(['form', 'valuesByPropertyKey', payload.propertyKey], payload.value)
};
```


<a id="adding-test-for-the-action-handler"></a>
## Adding unit tests for the actionHandler
As with the action, we also want to add unit tests for the created `actionHandler`, again jump into the responsible `index.spec.js` file and add the following test assertion which makes use of snapshot testing.

```js
// ... Pre-Existing tests ...

it('reducer()[actionTypes.SET_COMMENT_FORM_PROPERTY_VALUE] should set the given value to the form.valuesByPropertyKey and provided propertyKey path', () => {
  const initialState = {
    form: {
      valuesByPropertyKey: {
        postId: ''
      }
    }
  };
  const action = actions.setCommentFormPropertyValue('postId', 'fooPostId');
  const result = reducer(initialState, action);

  expect(result).toMatchSnapshot();
});
```


<a id="creating-selectors"></a>
## Creating selectors to query data from the redux store
Awesome, we've got almost everything in place to start integrating the UI and the business logic! There is only one missing piece to complete this puzzle - Selectors.

Selectors are the API to query something from the redux store. They are usually placed in either `selectors.js` or `selectors.memoized.js`. The first file holds so called `input selectors` while the second one selector compositions / memoized selectors.

Since we only need to retrieve raw data from the store and not transform it into a different shape we would only need to create a selector to get the value of a single `propertyKey`. Let's create it in the `selectors.js` file:
```js
// ... Pre-Existing selectors ...

//
// A selector is a pure function that takes two arguments, the first is the state, the second optional props.
// In our case the selector requires the key of which value it should retrieve which is again one of the keys of the `CommentType` data model.
//
export const getCommentFormDataValueForPropertyKey = (state: StateType, props: {key: $Keys<CommentType>}): string => $get(['comments', 'form', 'valuesByPropertyKey', props.key], state);
```


<a id="adding-test-for-the-selector"></a>
## Adding unit tests for the selector
As with everything else we should also cover the logic of the selector, let's head into the `selectors.spec.js` file and add the assertions.

```js
// ... Pre-Existing tests ...

describe('getCommentFormDataValueForPropertyKey()', () => {
  it('should be a function.', () => {
    expect(typeof selectors.getCommentFormDataValueForPropertyKey).toBe('function');
  });

  it('should return the value of the `comments.form.valuesByPropertyKey` which matches the propagated prop key.', () => {
    const state = {
      comments: {
        form: {
          valuesByPropertyKey: {
            body: 'Foo Bar baz body'
          }
        }
      }
    };
    const props = {
      key: 'body'
    };
    const result = selectors.getCommentFormDataValueForPropertyKey(state, props);

    expect(result).toMatchSnapshot();
  });
});
```

And thats it, application logic done! Let's continue with connecting the redux store with the view.

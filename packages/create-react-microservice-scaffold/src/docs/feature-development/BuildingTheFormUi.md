# Building the Form UI

In this chapter we will develop the UI of our example feature in the scaffold. We assume that you already read the previous chapters and got the development server up an running.

## Table of Contents

- [Creating the Form container](#creating-the-form-container)
- [Rendering the created Form container in the `DefaultLayout`](#rendering-the-container)
- [Adding the form markup to the container](#adding-the-form-markup)


<a id="creating-the-form-container"></a>
## Creating the Form container
We will start of by creating a new container with the name `CommentForm` and integrating it right away into the `DefaultLayout`. Create a new folder and file at `packages/my-fancy-ui/containers/CommentForm/index.js` and paste in the following code as a starting point, take your time and carefully read through the comments that we left.
```js
// @flow

//
// Up above we marked this file as flow-annotated, this will tell flow that it should check all types and warn you in case something is broken.
//
// The next two lines are imports of types from other files and packages, later on you will find out why we need them. :-)
//
import type {Connector} from 'react-redux';
import type {StateType} from './../../store/types.js';

//
// Next of we start by defining four types for Flow that we can re-use as we want.
//
// 1. `OwnPropsType` represents the props that we expect to be passed from the outside(e.g. if one wants to use this container and we need him to specify props we can declare them here)
// 2. `StatePropsType` represents the props that the `connect` HOC retrieves from the redux store.
// 3. `DispatchPropsType` represents the props which will dispatch actions to the store, again something that the `connect` HOC will take care for us.
// 4. `PropsType` is an intersection type, you can see it as all of the previous types merged together into one type.
//
type OwnPropsType = {};
type StatePropsType = {};
type DispatchPropsType = {};
type PropsType = OwnPropsType & StatePropsType & DispatchPropsType;

//
// Importing dependencies comes up next, since we use JSX we need to import React into our scope.
//
import React from 'react';
import {connect} from 'react-redux';

//
// And here comes the view / React component. We start of by using a functional component and annotate the first argument `props` to be of type `PropsType` that we defined earlier.
//
// Within the returned JSX we just added some example markup for testing purposes, later on this is where we will write our real markup.
//
const CommentForm = (props: PropsType) => {
  return (
    <div>
      My fancy container
    </div>
  );
};

//
// The next section is the configuration for the `connect` HOC of `react-redux`.
//
// 1. `mapStateToProps` is a function that maps the current redux store state into props for the Component.
// 2. `mapDispatchToProps` is a function or an object that maps action creators to props for the Component.
// 3. `connector` is the configured HOC
// 4. `Container` is the Component that got wrapped by the HOC.
//
const mapStateToProps = (state: StateType): StatePropsType => ({});
const mapDispatchToProps = (dispatch: Function, ownProps: OwnPropsType): DispatchPropsType => ({});
const connector: Connector<OwnPropsType, PropsType> = connect(
  mapStateToProps,
  mapDispatchToProps
);
const Container = connector(CommentForm);

//
// And finally we export everything to be able to test it independently.
// Note that we export the wrapped Component `Container` as the default export,
// so you can import is more easily e.g. `import MyFancyContainer` from './containers/MyFancyContainer/'
//
export {
  CommentForm,
  mapStateToProps,
  mapDispatchToProps,
  Container as default
};
```

When removing all of the comments you will end up with a lean basis to create Containers.


<a id="rendering-the-container"></a>
## Rendering the created Form container in the `Default` route
So lets render the created container so we have some feedback when writing the markup within the browser. Head into the `packages/my-fancy-ui/pages/index.js` file and import the newly created container...

```js
import CommentForm from './../../containers/CommentForm/';
```

... and add render it above the already present `<CommentsList />`, e.g.

```js
const DefaultLayout = (props: PropsType) => {
  return (
    <div
      className="mdl-layout__content"
      style={{display: 'flex', justifyContent: 'center'}}
    >
      <div className="page-content" style={{maxWidth: '640px'}}>
        <h2>{i18n.t('application.hello', {name: props.name})}</h2>
        <CommentForm />
        <CommentsList />
      </div>
    </div>
  );
};
```

switching back into your browser you should now see the rendered `My fancy container` text.


<a id="adding-the-form-markup"></a>
## Adding the form markup to the container
Since the container is now being rendered, we can add our form markup to the newly created container. Paste in the following JSX into your return value:

```js
const CommentForm = (props: PropsType) => {
  return (
    <form>
      <input name="id" type="text"/>
      <input name="postId" type="text"/>
      <input name="mail" type="text"/>
      <input name="name" type="text"/>
      <input name="body" type="text"/>
      <input type="submit" value="Create comment"/>
    </form>
  );
};
```

This form now renders an input for each property of the `comment` entity model which can be found in `packages/my-fancy-ui/src/store/modules/comments/types.js`.

You can type in values into the input and click on the submit button, but neither are the values stored somewhere nor does the submit button really do anything other than reload the page, so lets continue to add `i18n` support and afterwards implementing the business logic! :-)

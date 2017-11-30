# Introduction

In this chapter we will develop our first feature. We assume that you already read the previous chapters and got the development server up an running.

## Table of Contents

- [Description of the feature](#description-of-the-feature)


<a id="description-of-the-feature"></a>
## Description of the feature
Once you've opened up the default application that gets served with the scaffold, you will note that it is a simple list of data, in our case comments, that are fetched from an API.

The current feature set is:

1. The data is being fetched on the server side and the app is pre-rendered with the fetched data.
2. On the client the user can reload the comments from the API and delete them (though the delete will not be sent to the API yet).

What we will do in the next few chapters is to integrate a `Create new comment` form. We will build the UI, integrate the state into our redux store and create a saga that could communicate with an API. All of these steps are accompanied by annotated code examples that should help you understand what is going on.

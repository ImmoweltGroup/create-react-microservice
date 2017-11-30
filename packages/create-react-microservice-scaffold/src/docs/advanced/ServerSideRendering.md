# Server Side Rendering

Rendering your application on both the client and the server enhances the user experience greatly. The scaffold is using AirBnB's [hypernova](https://github.com/airbnb/hypernova) microservice as the basis to implement this. Hypernova handles a lot of repititive logic like managing a rendering-cluster as well as avoiding memory leaks by using JavaScript VMs for each request. This way you are safe from weird side-effects, another cool feature of it is that it's framework agnostic. :tada:

## Table of Contents

- [How does server side rendering work in this scaffold?](#how-does-it-work)
- [Performance considerations](#performance-considerations)


<a id="how-does-it-work"></a>
### How does server side rendering work in this scaffold?
Before we jump into the flow of rendering the app on the server, lets take a look what the scaffold executes upon start and generates while building the application.

#### Server instances:
1. Web server (Handles all incomming requests)
2. Hypernova (Manages a render-cluster and renders the application HTML)

#### Application bundles:
1. The whole application bundled for the client
2. The whole application bundled for node (since we can assume certain features of EcmaScript to be supported and use CommonJS as the module system of choice on Node)
3. The redux store / business logic for node (since we want to pre-fetch the data if necessary on the server side before actually rendering the application).

#### Web server
The web server is is a simple HTTP server which uses the express framework, it will serve the whole app and it's assets to the user. By default it's configured to catch all `GET` requests to `/`, once a get request hits this route it will prepare a so called request query to the hypernova server instance.

The request query to hypernova contains the `appId` to be rendered as well as an `initialState` which we generate by creating an instance of the applications redux store using the third application bundle. Once all server side sagas have finished we call the `store.getState()` method of redux to retrieve the `initialState` with which we send to the hypernova server instance via an HTTP `POST`.

#### Hypernova
Once hypernova receives the render request, it will decide on which worker instance (CPU core) the task needs to be rendered on. The chosen worker will pre-render the application in a VM with the `initialState` provided in our request body and as soon as React rendered the application it will return the HTML to the web server instance via the response body. It's now up to the web server again to wrap the received HTML of hypernova into the `index.html` template that webpack provided us and of course send the result to the user.

<a id="performance-considerations"></a>
### Performance considerations
Rendering your application on the server can be slow, especially if you need to fetch a lot of data (or your APIs aren't that fast in responding with data). In general Google and few other big players currently [recommend to only pre-render the so called "application shell"](https://developers.google.com/web/updates/2015/11/app-shell) so it might be worth to evaluate if this concept is a good option for your application and company.

In case this is not an option for you, we recommend you to read the following articles:

**Articles**

- [Scaling React Server-Side Rendering](http://arkwright.github.io/scaling-react-server-side-rendering.html)

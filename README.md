# ServerSideReact

1. [Let's get coding](#lets-get-coding)
2. [Server Configuration](#server-configuration)
3. [Refactoring for cleaner code](#refactoring-for-cleaner-code)
4. [Adding Navigation](#adding-navigation)
5. [Integrating support for Redux](#integrating-support-for-redux)

The HTML `<noscript>` element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser. [doc](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)

## The web app flow

### Traditional React App

```
              +----------------------+
              | Browser request page |
              +----------------------+
                         |
                         v
                +-----------------+
                | Request JS file |
                +-----------------+
                         |
                         v
+-------------------------------------------------+
| React app starts and requests JSON from backend |
+-------------------------------------------------+
                         |
                         v
               +--------------------+
               | Content is visible |
               +--------------------+
```

### Server Side Rendering

```
              +-----------------+
              | Receive request |
              +-----------------+
                       |
                       v
          +--------------------------+
          | Load React App in memory |
          +--------------------------+
                       |
                       v
                +------------+
                | Fetch data |
                +------------+
                       |
                       v
             +------------------+
             | Render React app |
             +------------------+
                       |
                       v
+----------------------------------------------+
| Take generated HTML and send back to browser |
+----------------------------------------------+
```

After loading the HTML, load the JS React App to make it dynamic. The big difference is the initial render is more complete to start with.

## Let's get coding

The app architecture:

```
+------------+    +------------------+    +--------------+
| API server | => | Rendering Server | => | User Browser |
+------------+    +------------------+    +--------------+
```

This project will be only focuesed on the Rendering Server. 

The API server is responsible for the business logic and data layer. The Rendering Server will only display the HTML.

We separate these servers because it's easier to scale it up later, and rendering React on server is slow.

```
$ yarn init -y
$ mkdir src
$ touch src/index.ts
$ yarn add express -S
$ yarn add @types/express -D
```

Webpack:
```
$ yarn add webpack webpack-cli webpack-dev-server clean-webpack-plugin -D
$ touch webpack.server.js
```

Typescript:
```
$ yarn add typescript ts-loader source-map-loader -D
$ touch tsconfig.json
```

React and React DOM:
```
$ yarn add react react-dom -S
$ yarn add @types/react @types/react-dom -D
$ mkdir src/client
$ touch src/client/App.tsx
```

## Server Configuration

Hot reloading:
```
$ yarn add nodemon -D
```

Update scripts in package.json:
```json
{
    "scripts": {
        "dev:server": "nodemon --watch build --exec \"node build/bundle.js\"",
        "dev:build:server": "webpack --config webpack.server.js --watch"
    },
}
```

At this point we are only displaying the HTML generated from the server side, but no dynamic React code is being executed.

In Isomorphic Web Apps, it renders the HTML first, in `index.js` and then the `client.js` craws over the HTML and render the React components over the HTML. (`hydrate`)

```
$ touch webpack.client.js
$ touch src/client/client.tsx
```

You need to tell express to treat the public folder as static (public)
```javascript
app.use(express.static('public'));
```

At this point, you need to run 3 commands:
```
$ yarn dev:build:server
$ yarn dev:build:client
$ yarn dev:server
```

## Refactoring for cleaner code

### Merging webpack config files

We have a lot of duplicated logic between `webpack.server.js` and `webpack.client.js`.

```
$ yarn add webpack-merge -D
$ touch webpack.base.js
```

Webpack will automatically import and bundle all imports. That's ok for browsers, but not necessary for server side.

```
$ yarn add webpack-node-externals -D
```

Single script start-up
```
$ yarn add npm-run-all -D
```

Using a renderer helper to split the logic that will take care of React render outside of server's `index.ts`.

```
$ mkdir src/helpers
$ touch src/helpers/renderer.tsx
```

## Adding Navigation

Implementing React Router support with 2 routing tiers:

* `StaticRouter`: Express router handler - will pass the routing decisions to React Router
* `BrowserRouter`: Client side React Router - running in a browser via hydration.

Building pages:
```
$ yarn add react-router-config react-router-dom -S
$ yarn add @types/react-router-config @types/react-router-dom -D
$ mkdir src/client/pages
$ touch src/client/pages/HomePage.tsx
$ touch src/client/Routes.tsx
```

## Integrating support for Redux

API server: http://react-ssr-api.herokuapp.com/

Big challenges with SSR Redux:
* Redux needs different configuration on browser and server sides.
* Aspects of authentication needs to be handled on server.
* Need some way to detect when all initial data load action creators are completed on server.
* Need state hydration on the browser.

```
$ yarn add react-redux redux redux-thunk -S
$ yarn add @types/react-redux @types/redux @types/redux-thunk -D
$ touch src/helpers/createStore.ts
$ yarn add axios -S
$ yarn add @types/axios -D
$ mkdir src/client/actions
$ touch src/client/actions/index.ts
```
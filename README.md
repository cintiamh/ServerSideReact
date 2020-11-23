# ServerSideReact

1. [Let's get coding](#lets-get-coding)
2. [Server Configuration](#server-configuration)

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

At this point, you need to run 3 commands:
```
$ yarn dev:build:server
$ yarn dev:build:client
$ yarn dev:server
```
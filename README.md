# ServerSideReact

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
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

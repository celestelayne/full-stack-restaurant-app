## Sprint 1: Connecting the Server to the Database

#### Getting Started

Install the required dependencies:

```bash
$ npm install express 
```
Create a file called `server.js`; then add the `node_modules` folder to `.gitignore` to hide it from github.

```bash
$ touch server.js
$ echo node_modules > .gitignore
```
In the `server.js` file, add the [Express boilerplate](https://expressjs.com/en/starter/hello-world.html) code:

```js
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000

app.get('/', async (request, response) => {
  try {
    response.send('Hello World')
  } catch (e) {
    response.status(500).json({ msg: e.status })
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
```

This app starts a server and listens on port 3000 for connections. The browser responds with “Hello World!” for requests to the root URL (/) or route. For every other path, it will respond with a `Cannot GET` response.

In the `package.json`, add a scripts property that creates a command to run the server:

```js
   "start": "nodemon server.js",
```

Run the application by executing the following command:

```bash
$ npm start
```
Then, load `http://localhost:3000/` in a browser to see the output, 'Hello World'.

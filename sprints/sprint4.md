## Sprint 4: Setting Up the Front End

#### Getting Started

First, let's create the React app inside the root of the project folder using `create-react-app`.

```bash
$ create-react-app client
$ cd client
```

Within `client`, the `src` folder contains the core business logic of our React application. The project folder structure should look like the following:

```md
client
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── assets
    │   ├── images
    │   ├── videos
    ├── components
    │   ├── Restaurant
    │       ├── Restaurant.js
    │       ├── Restaurant.css
    │   ├── Review
    │       ├── Review.js
    │       ├── Review.css
    ├── services
    │   ├── apiservices.js
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    └── index.js
```

Inside the `package.json` file, you will see several scripts have been provided that allows you to run several commands from Terminal:

> npm start. Starts the development server.

You will also see that several dependencies have been installed: `react`, `react-dom` and `react-scripts`. To start up the application, in the Termial begin by typing:

```bash
$ npm start
```

> Hooray for automatic rerendering on save! The default app should now be running on port 3000 so switching over to our browser localhost:3000, we'll automatically see the boilerplate create-react-app React application.

#### Modify File Structure

###### House Cleaning

Now, let’s do some house cleaning:

- To the `.gitignore` in the root folder, add the client node_modules folder:

```bash
$ echo node_modules > .gitignore
$ echo client/node_modules > .gitignore
```
In the client folder, delete the following files:

```bash
$ rm yarn.lock
$ rm .gitignore
```
In the src folder, delete the following files:

```bash
$ rm serviceWorker.js
$ rm logo.svg
```
Then, in the `index.js` file, delete all references to serviceWorker and in the `src/App.js`, delete the line that imports the logo.

###### More Folders

In the `src` folder, add the following folders:

```bash
$ mkdir src/assets
$ mkdir src/components
$ mkdir src/services
```
The `assets` folder is where we will maintain images and videos to be used in the application.

```md
└── src
    ├── assets
        ├── images
        ├── videos
```
The `components` folder is where we will set up our component file structure.

```md
└── src
    ├── components
    │   ├── Restaurant
    │       ├── Restaurant.js
    │       ├── Restaurant.css
    │   ├── Review
    │       ├── Review.js
    │       ├── Review.css
    │   ├── Cuisine
    │       ├── Cuisine.js
    │       ├── Cuisine.css
```
The `services` folder is where we will make our api calls.

```md
└── src
    ├── services
        ├── apiservices.js
```

#### Hello World

The `src/App.js` file should look similar to the following:

```js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to the Restaurant App</h1>
      </div>
    );
  }
}

export default App;
```

You’re ready to move on!

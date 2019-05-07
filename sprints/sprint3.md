## Sprint 3: Refactor Using Express Router

#### Getting Started

Here we will refactor the restaurant app to use [Express Router](https://expressjs.com/en/api.html#express.router). This will involve creating a `restaurantRouter` and moving over all the routes previously contained in the `server.js`

```js
const { Router } = require('express');

// Create the express router object for Restaurants
const restaurantRouter = Router();

// A GET to the root of a resource returns a list of that resource
restaurantRouter.get('/', async (request, response) => {})

// We specify a param in our path for the GET of a specific restaurant
restaurantRouter.get('/:id', async (request, response) => {})

// A POST to the root of a resource should create a new restaurant
restaurantRouter.post('/', async (request, response) => {})

// Update a particular restaurant
restaurantRouter.put('/:id', async (request, response) => {})

// Delete a specific restaurant
restaurantRouter.delete('/:id', async (request, response) => {})

module.exports = {
  restaurantRouter
}
```

Now, this `restaurantRouter` can be imported in `server.js` and mounted to the main app. This particular set of routes will be nested under /restaurants/:

```js
app.use('/restaurants', restaurantRouter);
```
Do the same for the `reviewRouter` and the `cuisineRouter`.

#### File Structure

This is what your server-side file structure shoudl look like so far:

```
├── node_modules
├── routes
    ├── cuisineRouter
    ├── restaurantRouter
    └── reviewRouter
├── scripts
    ├── resetDb.js
    └── seedDb.js
├── auth.js
├── models.js
├── .gitignore
├── package.json
├── README.md
    server.js
```


#### Thinking Forward: CORS

As we begin to set up our front-end, we have to think about where our requests are coming from. If we have two different origins (in this case, our ports 3000 && 3001) sharing resources, [our browser gets mad at us for opening a security vulnerability](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

In order to solve this problem, we install a middleware for Node (and, more specifically, Express) called [_CORS_](https://www.npmjs.com/package/cors).

```npm install cors```

This will solve the problem by enabling CORS. Nice and simple.

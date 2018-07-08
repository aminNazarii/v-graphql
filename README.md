# v-graphql
graphql client for VueJs and javascript

## github page
- [visit github page](https://github.com/aminNazarii/v-graphql)

## npm page
- [visit npm page](https://www.npmjs.com/package/v-graphql)

#based on
- [axios](https://www.npmjs.com/package/axios)

## Installation
You can install it via [yarn](https://yarnpkg.com/) or [NPM](http://npmjs.org/).

```bash
$ npm i v-graphql
$ yarn add v-graphql
```

## Usage
```js
import Vue from 'vue';
import grahpql from 'v-graphql';
window.$graphql = graphql;
```

#Headers
```js
graphql.axios.defaults.baseURL = 'http://127.0.0.1:8080';
graphql.axios.defaults.headers.common['Authorization'] = 'Access-token';
graphql.axios.defaults.headers.post['Content-Type'] = 'application/json';
graphql.axios.defaults.headers.post['Accept'] = 'application/json';
```

- Use
```js
Vue.use(grahpql);
```

## Resource
Collection of your queries and mutation in a js file.

- graphql.js
```js
export default {
  query: {
    Users: `
    query fetchUsers {
      AllUsers: Tickets {
        id,
        name
      }
    }`,
  },

  mutation: {
    addComment: `
      mutation addComment {
        CommentAdd(text: $text) {
          text,
          likes
        }
      }
    `,
  }
};
```
***graphql.js*** file must contain two section (query, mutation) and set your queries in query and mutations in mutation key.
- ***Notice:*** you have to create graphql.js in your needed place with ideal name.

- ***Use graphql.js***
```js
this.$graphql.setResources(require('./graphql.js').default);
```

### available methods
- query
- mutation

# Make request
- Query example

```js
this.$graphql.query('Users')
  .then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
```

- Mutation example
```js
let variables = {text: "i like this package"};
this.$graphql.mutation('addComment', {variables: variables})
  .then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
```

# also
- you can pass manually query to the method like below
```js
let variables = {text: "i like this package"};
let queryString = `
mutation addComment($text: String) {
  comment: Comment(text: $text) {
    id
    title
  }
}
`;

this.$graphql.mutation({query: queryString, variables: variables})
  .then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
```


# More details
if you use another schema except default schema you can define your schema in your request

- like this
```js
let variables = {text: "i like this package"};
this.$graphql.mutation('addComment', {variables: variables, schema: 'custome_schema'})
  .then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
```

- set custom prefix for graphql url
by default is 'graphql' if you need change it use below code

```js
this.$graphql.setPrefix('api_grahpql');
```

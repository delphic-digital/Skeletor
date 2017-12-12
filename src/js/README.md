# JavaScriptings

## Components

Deal with the UI. For most projects this will be where all the work happens.

## Services

Non UI specific logic. If 2 different UI components need to know about the same piece of data, that's a good sign that there should be a file in here that controls said data.

## Utilities

Methods to make life a little easier.

 - `api.js` makes calls to an API & caches them so you don't have to worry about debouncing identical API calls.
 - [`URLSearchParams.js`](https://www.npmjs.com/package/url-search-params-polyfill) makes search params on a url easy to manage!
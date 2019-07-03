# awesome-events

Node's event emitter for all engines.

## Installation

In a browser:

```html
<script src="awesome-events.js"></script>
```

Using npm:

```sh
npm install awesome-events --save
```


## Usage example

```js

var EventEmitter = require('awesome-events')

var logger = function (msg) { console.log(msg) }

var ee = new EventEmitter()

ee.on('message', logger)

ee.emit('message', 'hello world')

```

## Docs

See the [Node.js](https://nodejs.org/dist/latest-v10.x/docs/api/events.html) EventEmitter docs. events currently matches the Node.js 10.* API.
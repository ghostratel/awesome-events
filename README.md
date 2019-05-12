# awsome-events

Node's event emitter for all engines.

## Installation

In a browser:

```html
<script src="awsome-events.js"></script>
```

Using npm:

```sh
npm install awsome-events --save
```

## documentation

Options is very simple.

- `el` (`String` or `Element`) The element that you want it to disappear.
- `count` (`Number`) the canvas element will generate. By default is `10`, and modifying this option may affect performance.

## Usage example

```js

var EventEmitter = require('awsome-events')

var logger = function (msg) { console.log(msg) }

var ee = new EventEmitter()

ee.on('message', logger)

ee.emit('message', 'hello world')

```

## Docs

See the [Node.js](https://nodejs.org/dist/latest-v10.x/docs/api/events.html) EventEmitter docs. events currently matches the Node.js 10.* API.
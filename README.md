# `react-render-json`

JSON is great — for computers! But we humans need something a bit more expressive. Why create a JSON object, when you can create an `<Order />`? Why should your API layer need to understand the JSON output format? Why use a different framework on the client to the server, just because they're totally different environments and honestly it's kind of weird they both run on Javascript at all???

Why write
```json
{
	"orderId": 123,
	"customer": {
		"customerId": 456,
		"name": "Andrew"
	},
	"sku": {
		"skuId": 789
	},
	"shippingAddress": {
		// ...
	}
}
```
when you could write
```jsx
	<Order
		id="123",
		customer={ <Customer id="456" name="Andrew" /> }
		sku={ <Sku id="789" /> }
		shippingAddress={ <Address { ...addressProps } /> }
	/>
```
???

Use `react-render-json` to define a whole rich model layer as React components, then render them directly to JSON! It's Enterprisey!

# Installation

```sh
npm install --save react-render-json
```

# A simple example

The simplest way of using this library is to just build your JSON objects directly:

```jsx
import React from 'react';
import ReactJSON from 'react-render-json';

const payload = (
	<ReactJSON.Object
		id="object-id"
		entries={
			<ReactJSON.Array>
				<ReactJSON.Literal value={ 1 } />
				<ReactJSON.Literal value={ 2 } />
				<ReactJSON.Literal value={ 3 } />
			</ReactJSON.Array>
		}
	/>
);

res.body = ReactJSON.renderObject(payload);
```

This renders:

```json
{
	"id": "object-id",
	"entries": [ 1, 2, 3 ]
}
```

# A more complex example

The real power of `react-render-json` is in defining your own rich data model types in exactly the same way as you'd define any other React component:

```jsx
import React from 'react';
import ReactJSON from 'react-render-json';

function Counter() {
	const { start, stop } = this.props,
		children = [];
	for (let i = start; i <= stop; i++) {
		children.push(
			<ReactJSON.Literal value={ i } key={ i } />
		);
	}
	return <ReactJSON.Array>
		{ children }
	</ReactJSON.Array>;
}

const payload = (
	<ReactJSON.Object
		id="object-id"
		entries={
			<ReactJSON.Array>
				<Counter start={ 1 } stop={ 3 } />
			</ReactJSON.Array>
		}
	/>
);

res.body = ReactJSON.renderObject(payload);
```

This emits the same JSON as the simple example, but with much less code! You can also use class-based React components!

There's an even more complex example in [the example folder](example/src/index.js).

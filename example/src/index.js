import React from 'react';

import ReactJSON from 'react-render-json';

// Or, to test against your local version:
// import ReactJSON from '../../package';

class Person extends React.Component {
	render() {
		return <ReactJSON.Object
			name={this.props.name}
			greeting={`Hello, ${this.props.name}`}
		/>;
	}
}

function Animal() {
	return <ReactJSON.Literal value={ this.props.type } />;
}

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
			<Counter start={ 1 } stop={ 3 } />
		}
	/>
);

console.log(
	ReactJSON.renderString(payload, null, 2)
);

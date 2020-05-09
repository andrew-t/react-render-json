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

const payload = (
	<ReactJSON.Object
		id="object-id"
		entries={
			<ReactJSON.Array>
				<ReactJSON.Literal value={ 1 } />
				<Person name="Andrew" />
				<Animal type="dog" />
			</ReactJSON.Array>
		}
	/>
);

console.log(
	ReactJSON.renderString(payload, null, 2)
);

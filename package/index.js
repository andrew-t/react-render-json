function Array() {
	if (!this.props.children) return [];
	if (!this.props.children.map)
		return renderObject(this.props.children);
	return this.props.children.map(renderObject);
}

function Object() {
	const output = {};
	for (let k in this.props)
		output[k] = renderObject(this.props[k]);
	return output;
}

function Literal() {
	return this.props.value;
}

function renderString(component, ...args) {
	return JSON.stringify(renderObject(component), ...args);
}

function renderObject(component) {
	if (!component || !component.$$typeof) return component;
	const renderFunction = component.type.prototype.render || component.type;
	return renderObject(renderFunction.call(component));
}

module.exports = {
	renderString,
	renderObject,
	Array,
	Object,
	Literal
};

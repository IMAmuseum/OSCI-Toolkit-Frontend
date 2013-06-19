//this file should only be included when developing and not in production
var originalBackboneTrigger = Backbone.Events.trigger;
Backbone.Events.trigger = function() {

	var calls = this._callbacks;
	var eventSplitter = /\s+/;
	var events = arguments[0].split(eventSplitter);
	var node, tail, ev;
	while (ev = events.shift()) {
		if (node = calls[ev]) {
			tail = node.tail;
			while ((node = node.next) !== tail) {
				var cid = (node.context !== undefined) ? node.context.cid : undefined;
				if (cid === undefined && node.context !== undefined && node.context.models) {
					cid = "a collection";
				}
				if (cid === undefined) {
					cid = "undefined";
				}
			}
		}
	}

	originalBackboneTrigger.apply(this, arguments);
};

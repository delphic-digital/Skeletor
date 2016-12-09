export default function (what) {
	console.log(what)
}


/*var origConsole = window.console;

window.console = new Proxy(origConsole, {
	get: function(target, property, receiver) {
		var origMethod = target[property];
		return function () {
			var args = Array.prototype.slice.call(arguments)
			var result = origMethod.apply(origConsole, ['%c💀','color:#e3c376'].concat(args));
			return result;
		};
	}
});*/

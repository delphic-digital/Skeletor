;(function (DELPHIC, $LAB) {

$LAB.setGlobalDefaults({Debug:false, AlwaysPreserveOrder:true});

DELPHIC.inject = function(f,c){
	var queue = [], $chain = $LAB;
	
	if (f instanceof Array) {
		for (var i=0, len=f.length; i<len; i++) {
			queue.push(f[i]);
		}
	}else if (typeof f == "string") {
		queue = DELPHIC.LABconfig.shortcuts[f];
	}
	for (var i=0, len=queue.length; i<len; i++) {
		var which = queue[i];

		var path = DELPHIC.LABconfig.paths[which] || which;
		
		var type = path.split('.').pop();
		//var type = (path.indexOf('.js')!="-1") ? 'js' : 'css';

		if(!DEBUG){ path = path.replace(/(.*)\/(.*)(\.js|.css$)/i, '$1/$2.min$3?v=')+DELPHIC.ver};

		switch(type) {
			case 'js':
				injectJS(path);
				break;
			case 'css':
				injectCSS(path);
				break;
			default:
				return;
		}
		
	}

	if (typeof c === "function"){
		$chain = $chain.wait(c);
	}


	function injectJS(filename){
		$chain = $chain.script(filename);
	}

	function injectCSS(filename) {
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
		 if (typeof fileref!="undefined"){
		 	document.getElementsByTagName("head")[0].appendChild(fileref)
		 }
	}
}

} (DELPHIC = window.DELPHIC || {}, $LAB));
;(function(DELPHIC) {

	//Define external js plugins for delphic.jsload
	DELPHIC.LABconfig = {
		paths: {
			'delphic.myplugin'      : 'js/plugins/delphic.myplugin.js',
			'delphic.myplugincss'   : 'css/plugins/delphic.myplugin.css',
			'delphic.myotherplugin' : 'js/plugins/delphic.myotherplugin.js'
		},
		shortcuts: {
			'loadBothPlugins' : ['delphic.myplugin','delphic.myotherplugin']
		}
	}
	
} (DELPHIC = window.DELPHIC || {}));
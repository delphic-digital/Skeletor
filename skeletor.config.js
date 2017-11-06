//Keeping all the fed development files together, wherever a project needs them to be
const fedSrcRoot = './src';
const fedDistRoot = './dist';

const proxy = false; //The local url where the 'real' version of the site is running. Or false to serve the static files form fedDistRoot

let localUrl = proxy;
if (!proxy) {
	localUrl = `${fedDistRoot}/index.html`;
}

//Dist files may need to be split apart by type, hence no shared root variable
module.exports = {
	useBrowserSync: true,

	proxy: proxy, //set above
	localUrl: localUrl, //points to the static files OR proxy url if that is set
	stagingUrl: 'http://herodigital.com/',
	liveUrl: 'http://herodigital.com/',
	
	srcScssDir: `${fedSrcRoot}/scss`,
	distCssDir: `${fedDistRoot}/css`,
	distCssPngSpriteDirUrl: '../../assets/spritesheets', //for the dist css's url('...') - will be specific to each project
	
	srcJsDir: `${fedSrcRoot}/js`,
	distJsDir: `${fedDistRoot}/js`,
	
	srcSvgDir: `${fedSrcRoot}/sprite_svg`,
	distSpriteSvgDir: `${fedDistRoot}/sprite`,
	
	srcPngDir: `${fedSrcRoot}/sprite_png`,
	distSpritePngDir: `${fedDistRoot}/sprite`,
	
	templateLang: 'pug', // 'ssi' | 'pug' | false
	srcPugDir: `${fedSrcRoot}/_pug`,
	srcSSIDir: `${fedSrcRoot}/_ssi`,
	distTemplateDir: `${fedDistRoot}/_markup` //both pug and ssi render to here - only use one at a time
};

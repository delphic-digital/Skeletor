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
	templateLang: 'ssi', // 'ssi' | 'pug'
	useBrowserSync: true,
	srcJsDir: `${fedSrcRoot}/js`,
	srcScssDir: `${fedSrcRoot}/scss`,
	srcSvgDir: `${fedSrcRoot}/sprite_svg`,
	srcPngDir: `${fedSrcRoot}/sprite_png`,
	srcPugDir: `${fedSrcRoot}/_pug`,
	srcSSIDir: `${fedSrcRoot}/_ssi`,
	distJsDir: `${fedDistRoot}/js`,
	distCssDir: `${fedDistRoot}/css`,
	distSpriteSvgDir: `${fedDistRoot}/sprite`,
	distSpritePngDir: `${fedDistRoot}/sprite`,
	distTemplateDir: `${fedDistRoot}/_markup`,
	proxy: false, 
	distCssPngSpriteDirUrl: '../../assets/spritesheets', //for the dist css's url('...') - will be specific to each project
	localUrl: localUrl,
	stagingUrl: 'http://herodigital.com/',
	liveUrl: 'http://herodigital.com/'
};

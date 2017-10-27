//Keeping all the fed development files together, wherever a project needs them to be
const fedSrcRoot = './src';
const fedDistRoot = './dist';
const proxy = false; //The local url where the 'real' version of the site is running. Or false to serve the static files form fedDistRoot

let pa11yTestUrl = proxy;
if (!proxy) {
    pa11yTestUrl = `${fedDistRoot}/index.html`;
}

//Dist files may need to be split apart by type, hence no shared root variable
module.exports = {
    useBrowserSync: true,
    srcJsDir: `${fedSrcRoot}/js`,
    srcScssDir: `${fedSrcRoot}/scss`,
    srcSvgDir: `${fedSrcRoot}/sprite_svg`,
    srcPngDir: `${fedSrcRoot}/sprite_png`,
    distJsDir: `${fedDistRoot}/js`,
    distCssDir: `${fedDistRoot}/css`,
    distSpriteSvgDir: `${fedDistRoot}/sprite`,
    distSpritePngDir: `${fedDistRoot}/sprite`,
    proxy: false, 
    distCssPngSpriteDirUrl: '../../assets/spritesheets', //for the dist css's url('...') - will be specific to each project
    pa11yTestUrl: `${fedDistRoot}/index.html`
};

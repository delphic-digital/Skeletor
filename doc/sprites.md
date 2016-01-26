## How to create sprites Skeletor

Skeletor comes with any easy way to create sprites. [Spritesmith](https://github.com/Ensighten/grunt-spritesmith) is all set up. Drop a png in ```src/sprite``` and it's automatically added to ```assets/images/spritesheet.png``` with the grunt watch task. Your site has to be run with ```grunt``` or ```grunt dev``` first.

See grunt-spritesmith github for documentation on using it, but generally using in Skeletor's SASS is as easy as
```sass
@include sprite($icon-email);
```
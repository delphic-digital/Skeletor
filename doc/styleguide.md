## How to create a styleguide with Skeletor

Skeletor is equipped with [Hologram](https://github.com/trulia/hologram), a markdown-based documentation system for creating a [living style guide](http://styleguides.io/) for your project. Hologram looks for markdown comments and your CSS rules inside your partials to create the pages and sections for your living style guide.

The styleguide uses a Hologram theme called [Cortana](https://github.com/Yago/Cortana), the theme is located in your [```/Static/src```](/Static/src) directory. For custom styles overrides of the Cortana theme, add them to [```/Static/src/scss/partials/pages/_styleguide.scss```](/Static/src/scss/partials/pages/_styleguide.scss).

To get you up and running, there are a couple of example markdown comments found in the ```buttons.scss``` and ```icons.scss``` files located in [```/Static/src/scss/partials/base/```](/Static/src/scss/partials/base/).

Each partials' markdown comment tells Hologram how to organize this element / component when it creates the styleguide, see more information on [Hologram's Github documentation](https://github.com/trulia/hologram#quick-start).

To edit your styleguide homepage, edit the markdown in [```/Static/src/scss/index.md```](/Static/src/scss/index.md)

To build your styleguide, run: 

```grunt hologram```


To view the styleguide in your browser locally (with BrowserSync running), surf to the following URL: 

[http://localhost:3000/Static/dist/styleguide/](http://localhost:3000/Static/dist/styleguide/)



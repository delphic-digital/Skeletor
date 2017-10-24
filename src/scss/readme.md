## BEM with a sprinkling of ITCSS - but not quite as much as BEMIT.

**abstracts** contains variables and mixins. Also related utility classes, eg for colors. 

_This is the equivolent to "Settings" and "Tools" in ITCSS but merged for practicality, eg why keep breakpoint variables in a different location from breakpoints? If you have a good reason, write it up and submit a PR. Also note that although ITCSS says that no styles that output css should be defined in here there is again no reason given, hence utility classes like colors being defined alongside the color defenitions._

**base** contains the styling for bare HTML elements. 

_Note the double underscore prepended to normalize, this ensures it goes first as the sass files are processed alphabetically. In your project if you find yourself redefining styles from the normalize file feel free to pull them out normalize. As they say in Tesco - every little helps._

**components** The (hopefully, though it is usually a nieve hope) reusable chunks of UI. (Also here be BEM.)

_To make a component truley reusable it should not define it's own dimensions or margins. Even borders are questionable. Leave these to whatever context it is in, whither that be a layout or another component. Also try to name them for their design function (navigation, modal, accordion), not for the content they will contain (news-article, event, collection)._

**components/region** Inevitably there will be components that are specific to the area that they live in (header/footer/something special). 

**layout** Columns / Rows / Grids / sidebar section / 50 50 section ...

_TODO: notes on it here_

**utilities** single responsability classes to be sprinkled throughtout the markup. Look up Functional CSS / Atomic CSS / etc

_TODO: notes on it here_
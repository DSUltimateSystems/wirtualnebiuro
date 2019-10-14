# Konferensbokning

Tech documentation

## Structure
The main directory of the project contains two catalogues:
* app - contains the entire source code of the application
* fonts - fonts used in the project
* images - photos used in the project
* js - catalog with scripts
* scss - catalog with styles
* views - catalogue with page structure
* build - contains a generated code html, css, js, fonts, photos (`Folder with files ready to be displayed in the browser`)
* assets - Includes generated and reduced styles, scripts, fonts and photos

## Technical requirements
* node( https://nodejs.org/en/ ) v10.15.3
* gulp( https://gulpjs.com/ ) v3.9.1

## Project Initiation
In the root directory, type in the console( installation of all dependencies ):

```sh
$ npm install
```

## Working with the project

### Gulp commands
In the root directory, type in the console:
* `gulp` ( Default task, running just `gulp` will compile the sass, compile the project site, launch BrowserSync then watch files for changes )
* `build` ( Build task compile sass, twig, images, and fonts )
* `watch` ( Watch scss files for changes & recompile, watch .twig files run twig-rebuild then reload BrowserSync )
* `js` ( Compile .js files into build js directory With script.min.js )
* `sass` ( Compile .scss files into build css directory )
* `twig` ( Compile .twig files and pass data from json file matching file name. index.twig - index.twig.json into HTMLs )

### Description html
Go to catalogue
* app > views
The data directory contains the variables used on the pages( `Note that the json file must be assigned to a page index.twig.json > index.twig` )
`example index.twig.json includes the title of homepage`
The templates directory contains the pages broken down into modules
`example index.twig creates a homepage includes layout and modules`
* app > views > templates
the includes directory contains small code blocks or universal sections
`example cookies.twig includes html of cookies message`
the layout directory contains templates for pages
`example gallery.twig includes template without a header for the gallery`
the sections directory contains all sections/modules of the page
`example pagination.twig includes contains a pagination module`

### Description css
Go to catalogue
* app > scss
Contains styles broken down into modules

### Description js
* app > js
Includes scripts and libraries

### Js plugins

Libraries used in the project

| Plugin | Documentation | Usage |
| ------ | ------ | ------ |
| choices.js | [https://github.com/jshjohnson/Choices] | Configurable select box/text input plugin |
| noUiSlider | [https://refreshless.com/nouislider/] | JavaScript Range Slider |
| masonry | [https://masonry.desandro.com/] | Cascading grid layout library |
| tiny-slider 2.0 | [https://github.com/ganlanyuan/tiny-slider] | slider |
| Just-validate | [https://github.com/horprogs/Just-validate] | form validation |
| lightgallery | [https://sachinchoolur.github.io/lightGallery/] | A customizable, modular, responsive, lightbox gallery plugin |
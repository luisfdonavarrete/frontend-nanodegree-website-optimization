# Website Performance Optimization Portfolio Project

Website Performance Optimization project for Udacity Front-End Web Developer Nanodegree.

The objective in this project was to identify and perform optimizations to achieve a PageSpeed score of 90 or above. I made the following changes to the index.html in order to achieve this performance:

* I added the media attribute to the link tag to the print.css file with the value of 'print', because these styles are only used when the users print the page.
* I added the components folder to save the development version of the css, javascript, and images files.
* I added the async attribute to the script tags and moved them right before the closing body tag in order to hold up the javascript execution code.
* Grunt.js and grunt.js modules were used to automate the following tasks:
  * Javascript minification https://www.npmjs.com/package/grunt-contrib-uglify
  * CSS minification https://www.npmjs.com/package/grunt-contrib-cssmin
  * Image minification https://www.npmjs.com/package/grunt-contrib-imagemin
  * Image resize https://github.com/excellenteasy/grunt-image-resize
  * Inline cricial CSS https://www.npmjs.com/package/grunt-critical
  * Run Pagespeed Insights tests https://github.com/jrcryer/grunt-pagespeed
  * Run predefined tasks https://www.npmjs.com/package/grunt-contrib-watch
  
### The following optimizations were made to ensuring a consitent frame rate at 60fps when scrolling in pizza.html file.

* I reduced the number of pizza images added in the background because only a handful of them are rendered at any given time on the page.
* I used the a new image "pizza-small.png" which has the appropriate size, to generate the images elements on the background.
* I created a new variable, itemsPizzas, to keep track of the pizzas elements, this variable is set only once when the page has finished loaded.
* I set the itemsPizzas varible using itemsPizzas document.getElementsByClassName() method which is much faster than document.querySelectorAll().
* I use `transform: translateX()` and `will-change: left;` in the .mover class to force pizza elements into their own composite layer.


### To Test the website's performance please go to the following urls:

* [Portfolio index.hml file](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fluisfdonavarrete.github.io%2Fudportfolio%2F) 
* [Pizzeria Web Page](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fluisfdonavarrete.github.io%2Fudportfolio%2Fviews%2Fpizza.html)
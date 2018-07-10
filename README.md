

## Lesson plan viewer

I created this as part of lesson prep for a large class. I needed to separate the content and presentation. The content is held on a google drive spreadsheet.

The web app uses angular js and mathjax to displat the curriculum.

A major issue was creating a watcher on the mathjax queue so that the divs would correctly resize after processing the math.

A sample curriculum can be viewed here: https://lessonviewangular.glitch.me/

### Server.js

Scrapes google drive based on url id. (On google drive go to file->publish to web as csv, the id is in the url).

i.e.:
https://docs.google.com/spreadsheets/d/e/2PACX-1vQR33-gTQuwc_R1jSJy4TeNMAm_dyHqeeGRrFnW2d5Q27b2Q-THhsWoYG6GmDcFZefXDWg54xVnUi-n/pub?output=csv

The id is:
2PACX-1vQR33-gTQuwc_R1jSJy4TeNMAm_dyHqeeGRrFnW2d5Q27b2Q-THhsWoYG6GmDcFZefXDWg54xVnUi-n

Sends static files and json to client

### Views

Contains static html files for curriculum and homework displays.

### Public

Contains CSS and JS files.

client js contains the angular js app, directives etc.

angular-vertilize (https://github.com/Sixthdim/angular-vertilize) is used to equalize containers, specifically for the right hand bars which indicate time of lessons to equal to the height of the content of the lesson text.

### Screenshot

![Screenshot of lesson](/curriculumscreenshot.png)

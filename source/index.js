var gsap = require('gsap');
var page = require('page');
var hbtemplates = require('./templates.js');

console.log('i\'m alive !');

function loadJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

loadJSON('data/blog.json', function(response) {
    var actual_JSON = JSON.parse(response);
    document.querySelector('.blog__inner').insertAdjacentHTML( 'beforeend', hbtemplates.templates.blocks(actual_JSON) );
});

var gsap = require('gsap');
var page = require('page');
var hbtemplates = require('./templates.js');
var indexData = null;
var overlay = document.querySelector('#overlay');

console.log('I\'m alive!');

page('/', function(context){
  console.log(context);

  if(context.hash === '') {
    if (!indexData) {
      loadJSON('data/index.json', function(response) {
          indexData = JSON.parse(response);
          document.querySelector('.blog__inner').insertAdjacentHTML('beforeend', hbtemplates.templates.blocks(indexData));
      });
    } else {
      TweenLite.to(overlay, 0.5, {autoAlpha:0, ease:Circ.easeIn});
    }
  } else if(context.hash === 'what-we-do') {
    TweenLite.from(overlay, 0.7, {left:'300px', right:'300px', top:'400px', height:'310px', ease:Circ.easeOut});
    TweenLite.to(overlay, 0.5, {autoAlpha:1, ease:Circ.easeOut});
  }
});

page.start();



// helper for blocks on home page
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

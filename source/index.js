let gsap = require('gsap');
let page = require('page');
let hb = require('handlebars');
let hbtemplates = require('./templates.js');
let indexData = null;
let overlay = document.querySelector('#overlay');
let localfont = require('./localfont.js');
let baseURL = document.domain === 'ustwo.com' ? '/2015' : '';
let homeOverlayOpen = false;

console.log('I\'m alive!', document.domain);

//////////////////////////////////////////////////////////////////////
// Setup
//////////////////////////////////////////////////////////////////////
if (!indexData) {
  loadJSON(baseURL + '/data/index.json', function(response) {
      indexData = JSON.parse(response);
      document.querySelector('.blog__inner').insertAdjacentHTML('beforeend', hb.templates.blocks(indexData));
  });
}

if(baseURL === '/2015') {
  page.redirect('/');
}

//////////////////////////////////////////////////////////////////////
// Routing
//////////////////////////////////////////////////////////////////////
page('/', function(context){
  console.log(context);

  if (homeOverlayOpen) {
    closeHomeOverlay();
  }
});

page('/overlay_(.+)', function(context){
  console.log('overlay', context);
  openHomeOverlay(document.querySelector(`.blog__articles__item a[href*=${context.path.match(/\/(.+)/)[1]}]`).parentNode.getBoundingClientRect());
});

page('*', function(context){
  console.warn('Where am I?', context);
});

page.start({hashbang: true});

//////////////////////////////////////////////////////////////////////
// Overlay functions
//////////////////////////////////////////////////////////////////////
function openHomeOverlay(elementRect) {
  TweenLite.from(overlay, 0.45, {transformOrigin:'0% 0%', scale:elementRect.width / overlay.offsetWidth, x:`${elementRect.left}px`, y:`${elementRect.top-68}px`, ease:Circ.easeInOut});
  TweenLite.to(overlay, 0.35, {autoAlpha:1, ease:Circ.easeOut});
  homeOverlayOpen = true;
}

function closeHomeOverlay() {
  TweenLite.to(overlay, 0.3, {autoAlpha:0, y:'100px', ease:Circ.easeIn, onComplete:() => TweenLite.set(overlay, {y:0})});
  homeOverlayOpen = false;
}

//////////////////////////////////////////////////////////////////////
// Helper functions
//////////////////////////////////////////////////////////////////////
function loadJSON(file, callback) {
  let xobj = new XMLHttpRequest();
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

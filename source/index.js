let gsap = require('gsap');
let page = require('page');
let hb = require('handlebars');
let hbtemplates = require('./templates.js');
let localfont = require('./localfont.js');
let pageData = {};
let baseURL = document.domain === 'ustwo.com' ? '/2015' : '';
let homeOverlayOpen = false;
let URLhistory = [];

let pageContent = document.querySelector('#pageContent');

console.log('I\'m alive!', document.domain);

//////////////////////////////////////////////////////////////////////
// Routing
//////////////////////////////////////////////////////////////////////
page('/', function(context){
  page.redirect('/index/');
});

page('/index', function(context, next){
  loadPage('index', next);
});

page('/index/(.+)', function(context, next){
  // TODO: use promise to do this only once content is loaded
  openHomeOverlay(pageContent.querySelector(`.blog__articles__item a[href*="${context.pathname}"]`).parentNode.getBoundingClientRect());
  next();
});

page.exit('/index/(.+)', function(context, next){
  closeHomeOverlay(next);
});

page('/blog', function(context, next){
  loadPage('blog', next);
});

page('/blog/(.+)', function(context, next){
  // TODO: use promise to do this only once content is loaded
  openHomeOverlay(pageContent.querySelector(`.blog__articles__item a[href*="${context.pathname}"]`).parentNode.getBoundingClientRect());
  next();
});

page.exit('/blog/(.+)', function(context, next){
  console.log(URLhistory[URLhistory.length-1].split('/'), context.pathname.split('/'));
  closeHomeOverlay(next);
});

page('/work', function(context, next){
  loadPage('work', next);
});

page('*', function(context){
  console.log('*', context);
  URLhistory.push(context.path);
});

page.start({hashbang: true});

if(baseURL === '/2015') {
  // fake root URL on live site to fix references
  page.redirect('/');
}

//////////////////////////////////////////////////////////////////////
// Overlay functions
//////////////////////////////////////////////////////////////////////
function openHomeOverlay(elementRect) {
  let overlay = pageContent.querySelector('#overlay');
  TweenLite.from(overlay, 0.45, {transformOrigin:'0% 0%', scale:elementRect.width / overlay.offsetWidth, x:`${elementRect.left}px`, y:`${elementRect.top-68}px`, ease:Circ.easeInOut});
  TweenLite.to(overlay, 0.35, {autoAlpha:1, ease:Circ.easeOut});
  homeOverlayOpen = true;
}

function closeHomeOverlay(next) {
  let overlay = pageContent.querySelector('#overlay');
  TweenLite.to(overlay, 0.3, {autoAlpha:0, y:'100px', ease:Circ.easeIn, onComplete:() => {
    TweenLite.set(overlay, {y:0});
    next();
  }});
  homeOverlayOpen = false;
}

//////////////////////////////////////////////////////////////////////
// Helper functions
//////////////////////////////////////////////////////////////////////
function loadPage(pageName, next) {
  if(!pageData[pageName]) {
    loadJSON(baseURL + '/data/' + pageName + '.json', function(response) {
        pageData[pageName] = JSON.parse(response);
        showPage(pageName, next);
    });
  } else {
    showPage(pageName, next);
  }
}

function showPage(pageName, next) {
  if(URLhistory.length > 0 && URLhistory[URLhistory.length-1].split('/')[1] !== pageName) {
    console.log('coming to ' + pageName + ' from afar');
    let pageWrapper = pageContent.querySelector('.wrapper');
    // TODO: refactor this so that there's a spatial map of pages rather than conditionals - maybe as simple as using an array of pages and looking up which direction we're going?
    if(pageName === 'index') {
      TweenLite.to(pageWrapper, 0.35, {x:`${window.innerWidth}px`, ease:Circ.easeIn, onComplete:() => {
        renderPage(pageName, next);
        pageWrapper = pageContent.querySelector('.wrapper');
        TweenLite.set(pageWrapper, {x:0, y:0});
        TweenLite.from(pageWrapper, 0.35, {x:`-${window.innerWidth}px`, ease:Circ.easeOut});
      }});
    } else if(pageName === 'blog' || pageName === 'work') {
      TweenLite.to(pageWrapper, 0.35, {x:`-${window.innerWidth}px`, ease:Circ.easeIn, onComplete:() => {
        renderPage(pageName, next);
        pageWrapper = pageContent.querySelector('.wrapper');
        TweenLite.set(pageWrapper, {x:0, y:0});
        TweenLite.from(pageWrapper, 0.35, {x:`${window.innerWidth}px`, ease:Circ.easeOut});
      }});
    }
  } else {
    renderPage(pageName, next);
  }
}

function renderPage(pageName, next) {
  pageContent.innerHTML = hb.templates['page-' + pageName](pageData[pageName]);
  next();
}

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

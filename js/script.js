$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

(function (global) {

var dc = {};

var homeHtml = "/home-snippet.ejs";
var allCategoriesUrl =
  "https://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";
var menuItemsUrl =
  "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
var menuItemsTitleHtml = "snippets/menu-items-title.html";
var menuItemHtml = "snippets/menu-item.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});

// Load the menu categories view
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};

// const anscan=document.getElementById('forupdate');
// anscan.addEventListener('click',(e)=>{
//   const targetsite=`/question/${anscan.dataset.doc1}/${anscan.dataset.doc2}`;
//   fetch(targetsite,{
//     method:'POST'
//   })
//   .then(()=>{})
//   .catch(err=>{
//     console.log(err);
//   })
// })
// const likes=document.getElementById('likecount');
// like=int(likes.innerHTML);
// likes.addEventListener('click',()=>
// {
//     likes.innerHTML
// })
//My code
var mysheet=document.styleSheets[1];
var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules;
for (i=0; i<myrules.length; i++){
  if(myrules[i].selectorText.toLowerCase()==".box"){ //find ".box" rule
      var targetrule=myrules[i];
      break;
  }
}
dc.openForm = function() {
  targetrule.style.display = "block";
};

dc.closeForm = function() {
  targetrule.style.display = "none";
};

for (i=0; i<myrules.length; i++){
  if(myrules[i].selectorText.toLowerCase()==".box1"){ //find ".box" rule
      var targetrule1=myrules[i];
      break;
  }
}
dc.openFormque = function() {
  targetrule1.style.display = "block"
};

dc.closeFormque = function() {
  targetrule1.style.display = "none";
};


global.$dc = dc;

})(window);
